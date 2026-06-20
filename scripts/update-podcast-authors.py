#!/usr/bin/env python3
"""
Update podcast episode `authors` field with guest names extracted from:
  1. Bio sections in body (Guest Bio, Bio:, Bio & Links, Links and Bio)
  2. "Guest: Name" body pattern
  3. Title "Tonight's Guest: Name" pattern
  4. Title "with Name" pattern (fallback / name-completion only)

Usage:
  python3 scripts/update-podcast-authors.py           # dry run
  python3 scripts/update-podcast-authors.py --apply   # apply changes
"""

import os
import re
import sys
import argparse
from pathlib import Path

PODCAST_DIR = Path('/home/user/PowerShellOrgWebsite/content/podcast')

# --- Regexes ---

# Bio section header markers
BIO_HEADER = re.compile(
    r'^(?:Guest Bio(?:\s+and\s+(?:resource\s+)?(?:links|resources))?'
    r'|Bio\s*&\s*Links'
    r'|Links\s+and\s+Bio'
    r'|Bio)\s*:',
    re.IGNORECASE | re.MULTILINE,
)

# Name at start of a bio paragraph:
# - Handles "First Last is...", "First M. Last is...", "Cláudio works..."
# - Handles Dr./Prof. prefixes
# Unicode range covers Latin Extended (Cláudio, Gael, etc.)
BIO_NAME_RE = re.compile(
    r'^(?:Dr\.\s+|Prof\.\s+|Sir\s+)?'
    r'('
    r'[A-ZÀ-ɏ][a-zA-ZÀ-ɏ\'-]+'           # First name (must start uppercase)
    r'(?:\s+[A-Z]\.)?'                      # Optional middle initial
    r'(?:\s+[A-ZÀ-ɏ][a-zA-ZÀ-ɏ\'-]+){1,3}'  # 1-3 last name parts (must start uppercase)
    r')'
    # Must be followed by a verb, comma, or quote — NOT end of string (avoids “Resource Links” etc.)
    r'(?=\s+(?:is|was|are|has|works|joined|calls|lives|serves|brings|currently|helps|loves|leads|comes|'
    r'spent|built|started|founded|created|made|became|focuses|specializes|manages|develops|'
    r'graduated|studied|writes|teaches|runs|operates|hosts|shares|describes|speaks|uses|holds|'
    r'graduated|retired|transitioned|co-|left|returned|presented|received|earned|joined|wrote|published)'
    r'|\s*,|\s+[““])',
)

# First-name-only bio detection
FIRST_NAME_ONLY_RE = re.compile(
    r'^([A-ZÀ-ɏ][a-zA-ZÀ-ɏ\'-]+)\s+'
    r'(?:is|was|are|has|works|joined|loves|serves|helps|leads|comes|'
    r'spent|built|started|founded|writes|teaches|runs|hosts|uses|holds)\b',
)

# "Guest: Name" in body (may be markdown link, comma-separated, or "and" separated)
GUEST_COLON_RE = re.compile(r'^(?:\s|\*)*Guest:\s*(.+)', re.MULTILINE | re.IGNORECASE)

# "Tonight's Guest: Name" in title
TONIGHTS_GUEST_RE = re.compile(r"Tonight['’]?s?\s+[Gg]uest:\s+(.+)", re.IGNORECASE)

# Strings that are definitely not person names
NOT_A_PERSON_RE = re.compile(
    r'^(?:The\b|A\b|An\b|In\b|This\b|For\b|With\b|From\b|On\b|'
    r'PowerShell|Microsoft|Windows|Azure|DevOps|Cloud|GitHub|AWS|'
    r'Episode|Podcast|Session|Roundtable|Community|'
    r'Tonight|Join\b|Listen|Watch|Learn|Get\b|Set\b|'
    r'Fundamental|User\s+Group|Module|Service|'
    r'Desired|Standard|Simple|Advanced|Digital|Dynamic|Modern|'  # common tech adjectives
    r'Meet|Introducing|Featuring|Welcome|'  # introductory verbs mistaken for names
    r'Just\b|'
    r'http|www\.)',
    re.IGNORECASE,
)

# Company-type suffixes that indicate the string is an org, not a person
COMPANY_SUFFIX_RE = re.compile(
    r'\b(?:Software|Systems|Corp(?:oration)?|Inc\b|LLC|Ltd|'
    r'Group|Technologies?|Solutions?|Networks?|Services?|'
    r'Consulting|Associates?|Partners?|Enterprises?)\s*$',
    re.IGNORECASE,
)

# Lines/paragraphs that are clearly links or list items (skip when parsing bio sections)
LINK_OR_LIST_RE = re.compile(
    r'^\s*(?:<https?://|https?://|www\.|  -\s+https?://|-\s+https?://|\*\s+https?://|'
    r'\[(?:vc_|/vc_)|\[!\[|https?://)',
    re.IGNORECASE,
)

# Stop parsing bio section when we hit these markers
BIO_STOP_RE = re.compile(
    r'^(?:PowerShell\s+Podcast|YouTube:|Discord:|Join\s+(?:the|us)|'
    r'Learn\s+PowerShell|Subscribe|Hosts?:|Check\s+out|Guest\s+Request|'
    r'PDQ\s+Connect|The\s+PowerShell\s+Podcast\s+(?:on|hub)|'
    r'PowerShell\s+Pro\s+Tips|pscommunity\.de|'
    r'Resource\s+Links?|Show\s+[Nn]otes|Episode\s+Links|Related\s+Links)',
    re.IGNORECASE,
)


def looks_like_person(name: str) -> bool:
    """Return True if name plausibly looks like a human name."""
    if not name or len(name) < 4:
        return False
    if NOT_A_PERSON_RE.match(name):
        return False
    if COMPANY_SUFFIX_RE.search(name):
        return False
    words = name.split()
    if len(words) < 2:
        return False
    # At least 2 words starting with capitals (case-sensitive)
    if sum(1 for w in words if w and w[0].isupper()) < 2:
        return False
    # Reject if any word is fully uppercase (emphasis word like ALSO, PLUS, etc.)
    # Allow short initialisms like "F." or "B." but reject 2+ letter all-caps like "ALSO"
    if any(w.isupper() and len(w) > 1 and not w.endswith('.') for w in words):
        return False
    low = name.lower()
    # Reject obvious non-names
    for bad in ('http', 'www.', 'episode', 'podcast', 'powerscripting',
                'powershell', 'microsoft', 'roundtable', 'scripting', 'module'):
        if bad in low:
            return False
    return True


def clean_name(raw: str) -> str:
    """Strip markdown, HTML, asterisks, quotes, and common title prefixes from a name."""
    # Normalize non-breaking spaces and other Unicode whitespace
    raw = raw.replace('\xa0', ' ').replace(' ', ' ')
    # Unwrap markdown link [Name](url)
    raw = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', raw)
    # Strip inline HTML
    raw = re.sub(r'<[^>]+>', '', raw)
    # Strip markdown bold/italic markers
    raw = raw.replace('**', '').replace('*', '').replace('__', '').replace('_', '')
    # Strip embedded quoted nicknames/handles (e.g., "ScriptingWife", 'halswife')
    raw = re.sub(r'\s*["\'][^"\']{2,}["\']', '', raw)
    # Strip surrounding quotes
    raw = raw.strip('"\'')
    # Strip trailing punctuation
    raw = re.sub(r'[.,;:!?]+$', '', raw)
    # Strip leading honorifics / role titles
    raw = re.sub(
        r'^(?:MVPs?\s+|Distinguished\s+\w+\s+|Dr\.\s+|Prof\.\s+|special\s+guest\s+host\s+)',
        '', raw, flags=re.IGNORECASE,
    )
    return raw.strip()


def split_names(raw: str) -> list[str]:
    """Split 'Name1 and Name2', 'Name1 & Name2', or 'Name1, Name2' into a list."""
    # Handle "and" and "&" separators
    parts = re.split(r'\s+(?:and|&)\s+', raw, flags=re.IGNORECASE)
    names = []
    for part in parts:
        for sub in re.split(r',\s*', part):
            sub = sub.strip()
            if sub:
                names.append(sub)
    return names


def extract_names_from_bio_section(body: str) -> list[str]:
    """Find bio section headers and extract guest names from the paragraphs below."""
    guests: list[str] = []
    seen_first_names: set[str] = set()

    for hdr in BIO_HEADER.finditer(body):
        section_text = body[hdr.end():]
        paragraphs = re.split(r'\n\s*\n', section_text)

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
            if BIO_STOP_RE.search(para.splitlines()[0]):
                break
            if LINK_OR_LIST_RE.match(para):
                continue

            # Try full-name pattern
            m = BIO_NAME_RE.match(para)
            if m:
                name = clean_name(m.group(1))
                if looks_like_person(name) and name not in guests:
                    guests.append(name)
                    seen_first_names.add(name.split()[0])
                continue

            # Try first-name-only pattern (e.g., "Mike is a Microsoft MVP...")
            m2 = FIRST_NAME_ONLY_RE.match(para)
            if m2:
                first = m2.group(1)
                # Record so we can attempt completion from title later
                if first not in seen_first_names:
                    seen_first_names.add(first)
                    guests.append(first)  # Placeholder; will complete from title

    return guests, seen_first_names


def complete_first_names(guests: list[str], title: str) -> list[str]:
    """Attempt to replace first-name-only guests with full names found in the title."""
    # Collect all full names from the title (using the "with Name" extractor)
    title_full_names = extract_from_title_with(title)
    # Build a first-name → full-name map
    title_by_first: dict[str, str] = {}
    for full in title_full_names:
        first = full.split()[0].lower()
        title_by_first[first] = full

    result = []
    for g in guests:
        words = g.split()
        if len(words) == 1:
            key = g.lower()
            if key in title_by_first:
                full = title_by_first[key]
                if full not in result:
                    result.append(full)
            # else: can't complete → drop this first-name-only placeholder
        else:
            if g not in result:
                result.append(g)
    return result


def extract_from_guest_colon(body: str) -> list[str]:
    """Extract names from 'Guest: Name' body lines."""
    guests: list[str] = []
    for m in GUEST_COLON_RE.finditer(body):
        raw = m.group(1).strip()
        if not raw or raw.startswith(('<http', 'http', 'www.')):
            continue
        for name in split_names(raw):
            name = clean_name(name)
            if looks_like_person(name) and name not in guests:
                guests.append(name)
    return guests


def extract_from_title(title: str) -> list[str]:
    """Extract from 'Tonight's Guest: Name' title pattern."""
    m = TONIGHTS_GUEST_RE.match(title)
    if m:
        name = clean_name(m.group(1))
        if looks_like_person(name):
            return [name]
    return []


def extract_from_title_with(title: str) -> list[str]:
    """
    Extract guest names from title 'with Name' patterns (fallback only).
    Handles: 'with Name', 'with Name1 and Name2', 'with MVP Name', etc.
    """
    # Find everything after "with " in the title
    m = re.search(r'\bwith\s+(.+)', title, re.IGNORECASE)
    if not m:
        return []

    after_with = m.group(1).strip()

    # Strip common non-name prefixes
    after_with = re.sub(
        r'^(?:MVPs?\s+|Distinguished\s+\w+\s+|special\s+guest\s+host\s+)',
        '', after_with, flags=re.IGNORECASE,
    )
    # Stop at em-dash / double dash (topic separator)
    after_with = re.sub(r'\s*[-–—].*$', '', after_with)
    # Stop at "!" (e.g. "and More!")
    after_with = re.sub(r'!.*$', '', after_with)

    # Split on " and " or " & " to handle multiple guests
    parts = re.split(r'\s+(?:and|&)\s+', after_with, flags=re.IGNORECASE)

    guests: list[str] = []
    for part in parts:
        # Stop at comma, colon, or parenthesis (affiliation / topic follows)
        part = re.sub(r'[,:(\[].*$', '', part).strip()
        # Stop at "with" (nested topic keyword)
        part = re.sub(r'\s+with\s.*$', '', part, flags=re.IGNORECASE).strip()
        # Extract consecutive capitalized words (strict case, no IGNORECASE)
        # Limit to 3 words to handle compound surnames (e.g. "Ilse Van Criekinge", "Sven De Groote")
        # Tech phrases like "Desired State Configuration" are blocked by NOT_A_PERSON_RE on the first word
        words = part.split()
        name_words = []
        for w in words[:3]:
            clean_w = re.sub(r'[!?.]+$', '', w)
            if clean_w and clean_w[0].isupper():
                name_words.append(clean_w)
            else:
                break
        if len(name_words) >= 2:
            name = clean_name(' '.join(name_words))
            if looks_like_person(name) and name not in guests:
                guests.append(name)

    return guests


def get_guests(frontmatter: str, body: str, title: str) -> list[str]:
    """Try all strategies and return a deduplicated list of guest names."""
    # Strategy 1: Bio sections
    bio_guests, seen_first = extract_names_from_bio_section(body)
    bio_guests = complete_first_names(bio_guests, title)

    if bio_guests:
        return bio_guests

    # Strategy 2: "Guest: Name" body pattern
    gc_guests = extract_from_guest_colon(body)
    if gc_guests:
        return gc_guests

    # Strategy 3: "Tonight's Guest: Name" title
    tg_guests = extract_from_title(title)
    if tg_guests:
        return tg_guests

    # Strategy 4: "with Name" from title (last resort)
    tw_guests = extract_from_title_with(title)
    if tw_guests:
        return tw_guests

    return []


def parse_frontmatter(content: str):
    m = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if not m:
        return None, content
    return m.group(1), m.group(2)


def get_current_authors(frontmatter: str) -> list[str]:
    m = re.search(r'^authors:\s*\n((?:  - .+\n)+)', frontmatter, re.MULTILINE)
    if m:
        return [re.sub(r'^\s*- ', '', line).strip() for line in m.group(1).splitlines()]
    return []


def update_authors_in_frontmatter(frontmatter: str, new_authors: list[str]) -> str:
    block = 'authors:\n' + ''.join(f'  - {a}\n' for a in new_authors)
    return re.sub(
        r'^authors:\s*\n(?:  - .+\n)+',
        block,
        frontmatter,
        flags=re.MULTILINE,
    )


def process(apply: bool = False, verbose: bool = False):
    files = sorted(PODCAST_DIR.glob('*.md'))
    updated = 0
    skipped = 0
    errors = 0

    for fpath in files:
        try:
            raw = fpath.read_text(encoding='utf-8')
            fm, body = parse_frontmatter(raw)
            if fm is None:
                if verbose:
                    print(f'[SKIP] {fpath.name}: no frontmatter')
                skipped += 1
                continue

            title_m = re.search(r'^title:\s*(.+)$', fm, re.MULTILINE)
            title = (title_m.group(1) if title_m else '').strip('"\'')

            current_authors = get_current_authors(fm)
            guests = get_guests(fm, body, title)

            new_authors = list(current_authors)
            added = []
            for g in guests:
                if g not in new_authors:
                    new_authors.append(g)
                    added.append(g)

            if not added:
                skipped += 1
                if verbose:
                    print(f'[SKIP] {fpath.name}')
                continue

            print(f'[{"UPDATE" if apply else "DRY-RUN"}] {fpath.name}')
            print(f'  Title:   {title[:80]}')
            print(f'  Before:  {current_authors}')
            print(f'  After:   {new_authors}')

            if apply:
                new_fm = update_authors_in_frontmatter(fm, new_authors)
                new_content = f'---\n{new_fm}\n---\n{body}'
                fpath.write_text(new_content, encoding='utf-8')

            updated += 1

        except Exception as exc:
            print(f'[ERROR] {fpath.name}: {exc}', file=sys.stderr)
            errors += 1

    print()
    print('=' * 60)
    mode = 'Applied' if apply else 'Would update'
    print(f'{mode}: {updated}')
    print(f'No guest found / skipped: {skipped}')
    print(f'Errors: {errors}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true',
                        help='Write changes to disk (default: dry run)')
    parser.add_argument('--verbose', '-v', action='store_true',
                        help='Show skipped files too')
    args = parser.parse_args()
    process(apply=args.apply, verbose=args.verbose)

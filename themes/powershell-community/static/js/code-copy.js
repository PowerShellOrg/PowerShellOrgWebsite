/* Adds a click-to-copy button to every code block on the page.
   Handles two block types:
     - Hugo/Chroma `.highlight` blocks. With lineNos enabled these render as a
       two-column table; the code lives in the LAST cell, so we read that and
       leave the line-number gutter out of the copied text.
     - `.ps-terminal` shortcode blocks, where the code is in `pre > code`.
   Styling lives in /css/code-copy.css. */
(function () {
    'use strict';

    function codeText(block) {
        var cell = block.querySelector('table tr > td:last-child');
        var source = cell || block.querySelector('pre code') || block.querySelector('pre');
        return source ? source.textContent.replace(/\n+$/, '') : '';
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy') ? resolve() : reject();
            } catch (err) {
                reject(err);
            } finally {
                document.body.removeChild(ta);
            }
        });
    }

    var IDLE = '<i class="fas fa-copy" aria-hidden="true"></i><span>Copy</span>';
    var DONE = '<i class="fas fa-check" aria-hidden="true"></i><span>Copied!</span>';

    function attach(block) {
        if (block.querySelector(':scope > .code-copy-btn')) {
            return;
        }
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-copy-btn';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.innerHTML = IDLE;
        block.appendChild(btn);

        var reset;
        btn.addEventListener('click', function () {
            copyText(codeText(block)).then(function () {
                btn.classList.add('copied');
                btn.innerHTML = DONE;
                clearTimeout(reset);
                reset = setTimeout(function () {
                    btn.classList.remove('copied');
                    btn.innerHTML = IDLE;
                }, 2000);
            }).catch(function () {
                btn.innerHTML = '<span>Press Ctrl+C</span>';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.prose .highlight, .ps-terminal').forEach(attach);
    });
})();

---
title: PowerShell.org Site Status Update
authors:
  - Don Jones
date: "2018-10-24T17:45:55+00:00"
categories:
  - Announcements
legacy_featured_image: /wp-content/uploads/2018/10/shutterstock_144607415.jpg
aliases:
  - /2018/10/powershell-org-site-status-update/
---

_This post will be periodically updated as needed, so feel free to check back._  
Our site upgrade and re-theme is going well, and I wanted to outline some of the major changes and current issues. If you're encountering any lingering issues, please drop a comment; rather than replying, I'll update the main article.  
<!--more-->


The **new theme** is largely successful and is fully implemented. We've seen some issues with the pop-up login/register dialog for some users; you can always visit 
 if you need a non-pop-up login experience.  
The **new user profile and directory system** is online. This includes a [Member Directory][1], and a [Verified Profile Program][2]. Please read about the program very carefully if you intend to participate. We've unfortunately seen a lot of profiles missing photos, including photos of someone's dog, or using unacceptable Display Names. Not being in the Program does not impact your ability to use the rest of the site, but if you want to be in the Member Directory, you'll need to comply with the rules.  
The new user profile system also, by default, **was sending clear-text passwords** for new registrations and password changes. That is demonstrably a bad idea, and I've finally figured out how to fix it. The problem was an interaction between about nine plugins and the core WordPress code, which took a hot minute (whilst dodging justifiably angry emails) to unravel.  
If you are requesting a **password reset** and not getting the email, your spam filters are blocking it. Sorry. Emails of that type are commonly sent as phishing attempts, and so that's why they get blocked. You're welcome to create a new account, if you wish.  
**Forums notifications** were known to be not-working and are now verified to be working. If you're not getting them, check the spam filters.  
The specialized **forums views, **including things like "Topics with No Replies," are borked. That's on my list.  
From the **authentication** front, we do not yet support 2FA. We're speaking with the user manager module developer about adding that, as whatever we do needs to be compatible with that module. We'll aim for Authy/Authenticator first, and then move on to working on physical tokens like yubikey. It is too early to place requests for Your Favorite 2FA to be supported.  
**UPDATE: **Also in the **authentication** front, I've been looking into re-adding social logins (Twitter, etc) to the site. At this time I'm pausing that effort. While I grok the convenience, there are some serious downsides, like a total inability to influence whatever the social services decide to impose in terms of rules from moment to moment. Removing one of those services, once you rely on it, is damn near impossible, and I'm not necessarily keen to give companies like Facebook any more hooks into people's lives. We're instead going to try and focus deeply on enabling 2FA within the site, to provide a more secure login experience right here. Seeing how Facebook has been using people's mobile phone numbers (provided to FB only to enable 2FA) for ad targeting, I'm just even more distrustful of what they're doing with their login services. The general feeling in the InfoSec community is "don't do social logins to your websites" and that's kind of where I'm at right now.  
We've added support for **Ranks & Badges **on the site, which display in your [profile][3] and are attached to site activity. Open to suggestions on how to expand that program, and know that the current badge graphs are drafts until we have some proper ones made by someone talented. Volunteers welcome.  
I think that's it. If I'm missing anything, ask in the Comments, and I'll update above.  



 [1]: /members
 [2]: https://powershell.org/members/our-verified-profile-program/
 [3]: /profile

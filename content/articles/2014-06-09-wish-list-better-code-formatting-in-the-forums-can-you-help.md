---
title: "Wish List: Better Code Formatting in the Forums (Can You Help?)"
authors:
  - Don Jones
date: "2014-06-09T18:06:36+00:00"
aliases:
  - /2014/06/wish-list-better-code-formatting-in-the-forums-can-you-help/
---

I know it's been a "wish" of many folks for our forums to have better code formatting. Well, if you know some PHP and a little about WordPress, you can make it happen.  
What we need is a WordPress plugin that hooks the action for post displays. The plugin needs to take the post body, and look for anything contained within HTML "code" tags or "pre" tags.  
Within that content, the plugin needs to strip any further code/pre tags (WordPress has a bit of a glitch where it'll sometimes nest them). It should then HTML-encode the remaining content to turn any backticks into an HTML entity. Finally, it should color-code the content, or whatever, and hand it back to WordPress for display.  
If you think you might be interested, let me know.  
There ARE existing code formatters. But they have some weaknesses:

  * Many require you to use a custom shortcode, which our forums users won't pick up on. Getting folks to use the standard CODE tag, which is even on the toolbar, is hard enough.
  * Most require additional directives to specify the language and whatnot that will be formatted - that's a hurdle people, in the past, weren't able to grasp.
  * Some use extensive client-side JavaScript, which is heavy, performs poorly, and doesn't interact well with some of the other JavaScript on the site.
  * Many don't accommodate WordPress' treatment of backticks. WP wants them to be code delimiters, but obviously in PowerShell the backtick is important for other reasons.

What we need isn't giant, and it isn't complicated, it'll just require some time.  
**UPDATE:** I'm working on it.  
**UPDATE:** I think I got it. I'm using the GeSHi parser Joel uses on PoshCode.org, although I've applied different CSS style to it. If anyone would like to tackle improving that parser, or the CSS, you can hit me up and I'll give you the code as it stands. But as-is, we get line-numbered, colorized syntax in a scrollable window when you use`to enclose your code blocks. WordPress backticks aren't allowed for code, and inline code isn't supported. Older HTML-style CODE and PRE tags will be converted automatically. I think.

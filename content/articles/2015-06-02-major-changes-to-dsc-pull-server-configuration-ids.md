---
title: Major Changes to DSC Pull Server Configuration IDs
authors:
  - Don Jones
date: "2015-06-02T13:45:09+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/06/major-changes-to-dsc-pull-server-configuration-ids/
---

Configuration IDs - Globally Unique Identifiers, or GUIDs, that DSC nodes use to identify themselves to a pull server - have always been a limiting factor in DSC design and architecture. In the April 2015 preview of WMF5, however, Microsoft has completely overhauled Configuration IDs. If you're working with DSC, this is must-have information.  
<!--more-->


For the official write-up, see http://blogs.msdn.com/b/powershell/archive/2015/05/29/how-to-register-a-node-with-a-dsc-pull-server.aspx?utm_content=bufferd9bce&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer.  
In a nutshell:

  * Nodes can now be assigned a human-meaningful AgentID. This is unique per node, and allows the node to uniquely identify itself to the pull server for reporting purposes, regardless of what configuration the node is pulling.
  * Configuration IDs are no longer GUIDs, but are instead human-readable strings. This means your MOF filenames on the pull server can now be meaningful and easier to identify. It also means it's easier to track which configuration a node is pulling.
  * A new RegistrationKey acts as a password between the node and the pull server, making it harder for a bad actor to pull configuration files. Now that configuration MOFs have more meaningful text names, and not hard-to-guess GUIDs, this provides an extra layer of protection. The registration key is set in the node's meta config, and in the web.config file of the pull server.

These changes should make it MUCH easier for nodes to share configurations (especially partials), and help eliminate the hassle of tracking which node had which GUID. In fact, these changes can actually reduce the need for certain DSC tooling (that we've never gotten anyway) to track node-to-configuration mappings.

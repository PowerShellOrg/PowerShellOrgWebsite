---
title: "Microsoft Graph PowerShell Module: Getting Started Guide"
authors:
  - James Petty
date: "2023-09-15T16:21:15+00:00"
categories:
  - Graph
  - PowerShell for Admins
tags:
  - Microsoft Graph
  - Microsoft 365
  - Modules
  - Tutorial
aliases:
  - /2023/09/microsoft-graph-powershell-module-getting-started-guide/
---

# Microsoft Graph PowerShell Module: Getting Started Guide

by Jeff Brown

Microsoft is retiring the Azure AD Graph API sometime after June 30, 2023 ([announcement][1]). This retirement includes the Azure AD PowerShell module. In its place, Microsoft has released the Microsoft Graph PowerShell module. The Microsoft Graph PowerShell module is the next-generation way of managing Microsoft cloud services using PowerShell. If you have used MSOnline or Azure AD PowerShell in the past, you'll need to read on to learn about this new module.

In this tutorial, you will learn about the Microsoft Graph module, including how to authenticate, find cmdlet permissions, and upgrade from Azure AD PowerShell. To follow along with this tutorial, you will need either Windows PowerShell 5.1 or PowerShell 7. This tutorial uses PowerShell version 7.3.4.

## What is Microsoft Graph?

Microsoft Graph is the entry point to all things Microsoft 365 and Azure. Microsoft Graph exposes REST APIs and client libraries so you can access data and manage resources in Microsoft 365, Enterprise Mobility + Security, and Dynamics 365. The Microsoft Graph API has a single endpoint (<https://graph.microsoft.com>) that enables you to access data and build apps supporting any business need.

> **Related: [Jeff Brown Tech | Getting Started with Graph API][2]**

Some common uses for accessing Microsoft Graph include:

  * Managing user accounts and licenses
  * Viewing and accessing files in OneDrive
  * Reading Outlook e-mail and calendar events
  * Managing Intune devices

If you are new to REST APIs or just the Microsoft Graph, you can use Graph Explorer to try out different commands, including viewing your profile, managing groups, or working with Microsoft Teams. You can explore the sample tenant data or sign in to your Microsoft 365 account to view personalized responses.

Try out the Graph Explorer:

  1. Navigate to <https://developer.microsoft.com/graph/graph-explorer>.
  2. Select a pre-built query from the left menu, such as **GET my profile**.
  3. Next, review the generated URL endpoint (<https://graph.microsoft.com/v1.0/me>).
  4. Select the **Run query** button, then view the results under **Response preview**. You can make HTTP requests to Microsoft Graph to view and manage data like this!

![Graph Explorer example](https://powershell.org/wp-content/uploads/2023/09/graph_explorer_example-300x126.png) 

## Microsoft Graph PowerShell Module

Cloud administrators have used the MSOnline and Azure AD PowerShell modules for managing Azure AD for years. The retirement of the Azure AD Graph API means Microsoft is also retiring those modules. The Microsoft Graph PowerShell module replaces the Azure AD PowerShell and MSOnline modules. The module is an API wrapper for accessing Microsoft Graph. The module contains cmdlets that interact with the Graph API using native PowerShell syntax. You don't have to worry about generating URLs or crafting search syntax; that is all included in the PowerShell commands.

Some features and benefits of the new modules are:

  * Besides managing Azure AD, you can access other APIs, such as SharePoint, Exchange, Teams, and Outlook using a single endpoint.
  * Microsoft Graph PowerShell supports both Windows PowerShell 5.1 and PowerShell 7 (the Azure AD PowerShell module only supports Windows PowerShell 5.1).
  * The module works on multiple platforms, including Windows, macOS, and Linux.
  * Modern authentication support.
  * Open source with regular updates to support the latest Graph API changes.

### Installation

To install the module on PowerShell 7, use the `Install-Module`command, specifying the`Name`of the module (`Microsoft.Graph`), and select a`Scope`for installation (`CurrentUser`or`AllUsers`).


`powershell
# Install for current user
Install-Module -Name Microsoft.Graph -Scope CurrentUser

# Install for all users
Install-Module -Name Microsoft.Graph -Scope AllUsers
`### API Version

By default, the module uses the Microsoft Graph REST API v1.0. You can also experiment with commands in the beta version by switching your API version. Use `Select-MgProfile`with the`Name`parameter to target the`Beta`version. If you want to switch batch to using v1.0 API commands, use`v1.0`for the`Name`parameter.


`powershell
# Switch to Beta
Select-MgProfile -Name Beta

# Switch to v1.0
Select-MgProfile -Name v1.0
`## Microsoft Graph PowerShell Authentication Types

The Graph PowerShell module supports two types of authentication: delegated and app-only. The following sections will explain the differences, and the remainder of this tutorial will focus on using delegated access.

### Delegated access

Delegated access is when an application acts on behalf of a signed-in user. For example, you sign into an application, and the application calls the Microsoft Graph on your behalf. Both you and the application must be authorized to make requests to Microsoft Graph.

Delegated access requires delegated permissions, also known as scopes. Scopes represent the operations the application can perform on behalf of a user. You will see how scopes come into play later in this tutorial when you connect to the Microsoft Graph using PowerShell.

### App-only access

App-only access involves an application or service accessing Microsoft Graph without a signed-in user account. The application obtains an access token that includes information on what the application is authorized to access in the Microsoft Graph. An application calls the Microsoft Graph when assigned application permissions (or app roles) or when the application is an owner of the resources it needs to manage.

To use app-only access:

  1. Register an app with Azure AD.
  2. Configure applicable Microsoft Graph permissions for the app.
  3. Have an administrator grant the permissions.
  4. Code the app to request an access token.
  5. Use the access token and HTTP requests to call Microsoft Graph.

For more information on using app-only access, check out the Microsoft Learn article [Get access without a user][3].

## Authenticating to Microsoft Graph

The remainder of this tutorial focuses on connecting to Microsoft Graph using delegated access. There are three ways to connect with delegated access using the `Connect-MgGraph`command.

  * **Interactive authentication:** A browser opens to authenticate to your tenant. 

`powershell
Connect-MgGraph
`* **Device authentication:** Navigate to a URL and enter a device code to authenticate. 

`powershell
Connect-MgGraph -UseDeviceAuthentication
`* **Access token:** Authenticate using your own access token. 

`powershell
Connect-MgGraph -AccessToken $AccessToken
`After authentication, if this is your first time connecting to Microsoft Graph using PowerShell, a permission request window will appear. This prompt authorizes the Microsoft Graph Command Line Tools to act on your behalf. If you want to consent on behalf of your organization, check the box; otherwise, leave it unchecked and click **Accept**.

![Microsoft Graph permissions request](https://powershell.org/wp-content/uploads/2023/09/graph_permissions_request.png) 

Once connected, PowerShell displays a **Welcome to Microsoft Graph!** message.

![Microsoft Graph connection](https://powershell.org/wp-content/uploads/2023/09/welcome_message.png) 

### Understanding scopes

Once connected, try running any command, such as **Get-MgUser**. This command should display user accounts in your tenant. However, you might be presented with an error message about insufficient privileges to complete the operation, like this:

![Microsoft Graph insufficient privileges](https://powershell.org/wp-content/uploads/2023/09/insufficient_privileges_error.png) 

When connecting to Microsoft Graph using interactive or device code authentication, you must specify the permission scopes required during your session. Remember from earlier that scopes are the permissions the application performs on your behalf. With the Microsoft Graph PowerShell SDK, you specify what permissions you are granting it to carry out the commands.

You can view existing scopes for a session using `Get-MgContext`and viewing the`Scopes`property. In this example, the current context includes`openid, profile, User.Read, email`.

![Microsoft Graph context scopes](./mgcontext_scopes.png) 

### Finding command scopes

Now that you know you need to specify scopes in your connection, how do you find the necessary scopes for each command? You use the `Find-MgGraphCommand`and specify the`Command`parameter. Optionally, you can specify which`ApiVersion`you are using (currently`v1.0`or`beta`).

To view permissions more easily, pipe the results and expand just the `Permissions`property. Next, select just unique values for the permission`Name`property. Here are the command and results for finding permissions for`Get-MgUser`.


`powershell
Find-MgGraphCommand -Command "Get-MgUser" |
  Select-Object -ExpandProperty Permissions |
  Select-Object -Unique Name
`![Find Microsoft Graph command permissions](https://powershell.org/wp-content/uploads/2023/09/find_permissions_1.png) 

Many permissions allow you to list users; however, you don't have to specify every single one in your connect command. Choose one that makes the most sense. In this example, since you are getting information about user accounts, the `User.Read.All`scope seems most appropriate.

### Adding scopes to the connection

Re-run the `Connect-MgGraph`command again, this time using the`Scopes`parameter with a value of`User.Read.All`. You will repeat the authentication and permission process from earlier.


`powershell
Connect-MgGraph -Scopes 'User.Read.All'
`Re-running the `Get-MgUser`should now return a list of user accounts in your environment. This command works because you allowed the application to use the`User.Read.All`permission on your behalf.

As a bonus, re-run the `Get-MgContext`command and view the additional scope (hint: you may need to expand the`Scopes`property to view all the entries). You should see the`User.Read.All`scope added to your context.

As a challenge, say you want to update a user's display name using the `Update-MgUser`command. Use the previous steps to find and add the additional permission scopes to your connection.

To view all available application and delegated permissions, check out the [Microsoft Graph permissions reference][4] article at Microsoft Learn.

### Disconnecting from Microsoft Graph

Use the `Disconnect-MgGraph`command to disconnect from Microsoft Graph. Do note that`Disconnect-MgGraph`does not remove your scopes. The scopes added are included in your connection the next time you run`Connect-MgGraph`so you don't have to specify them again.

## Upgrade from Azure AD PowerShell

As previously mentioned, Microsoft is retiring the Azure AD, Azure AD Preview, and MSOnline PowerShell modules. The new Microsoft Graph PowerShell module replaces these modules for managing Azure AD and provides cmdlets for interacting with other Microsoft services.

If you have existing scripts, functions, or modules using the retiring modules, you need to review and document the commands and parameters you are using in them. Start with simpler scripts with lower business impact while developing a migration process. You will also need to determine if you need delegated or app-only access for authentication.

Microsoft provides documentation that maps cmdlets from Azure AD and MSOnline modules to the new Microsoft Graph module. Review the article at Microsoft Learn titled [Find Azure AD and MSOnline cmdlets in Microsoft Graph PowerShell][5] for more information.

## Summary

The Microsoft Graph PowerShell module is a powerful tool for managing not only Azure AD but many other Microsoft cloud services. You learned about installing the new module and the different authentication methods. Connecting to Microsoft Graph using PowerShell also requires defining your scoped permissions, and you learned how to find those scopes.

Additional reading about working with the new Microsoft Graph PowerShell module is below. Good luck and happy scripting!

[Microsoft Learn | Authentication module cmdlets in Microsoft Graph PowerShell][6]

[Microsoft Learn | Upgrade from Azure AD PowerShell to Microsoft Graph PowerShell][7]

 [1]: https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/azure-ad-change-management-simplified/ba-p/2967456
 [2]: https://jeffbrown.tech/getting-started-with-microsoft-teams-and-graph-api/
 [3]: https://learn.microsoft.com/graph/auth-v2-service
 [4]: https://learn.microsoft.com/graph/permissions-reference
 [5]: https://learn.microsoft.com/powershell/microsoftgraph/azuread-msoline-cmdlet-map
 [6]: https://learn.microsoft.com/powershell/microsoftgraph/authentication-commands
 [7]: https://learn.microsoft.com/powershell/microsoftgraph/migration-steps

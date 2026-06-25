---
title: "PowerGUI® 3.0 Hotfix: Double-clicking on a ps1, psm1, or psd1 file to open the Script Editor shows the Start Page as the active page in the Script Editor"
authors:
  - Kirk Munro
date: "2011-07-20T22:11:47+00:00"
aliases:
  - /2011/07/powergui-3-0-hotfix-double-clicking-on-a-ps1-psm1-or-psd1-file-to-open-the-script-editor-shows-the-start-page-as-the-active-page-in-the-script-editor/
---

This article describes an issue that was introduced into both [PowerGUI][1] and [PowerGUI Pro][2] when version 3.0 was released and provides a recommended solution to that issue.

#### Problem

While the [PowerGUI][1] Script Editor is closed, double-clicking on a ps1, psm1 or psd1 file or right-clicking on one of those file types and selecting "Open with PowerGUI Script Editor" will open the file you selected in the Script Editor as expected; however the Start Page will appear as the active tab in the Script Editor instead of the file you opened.

#### Affected Products

  * PowerGUI 3.0 (freeware)
  * PowerGUI Pro 3.0

#### Solution

To resolve this problem, a new version of the [Script Editor Essentials][3] Add-on has been released.  This version (3.0.0.75) includes a modification to the Script Editor behaviour such that any file you use to open the PowerGUI Script Editor will immediately become the active file.

**To install this hotfix, please follow these steps:**

_If you are connected to the Internet_

  1. **Open** the PowerGUI Script Editor. 
  2. **Run** the following command from the embedded PowerShell console: 

`$oldState



=



$PGSE

.

Configuration

[

'

/CollectAndSendInformation

'

]


if

 (

-not



$oldState

) {


$PGSE

.

Configuration

[

'

/CollectAndSendInformation

'

] 

=



$true


}

`3. Select **Tools** | **Find Add-ons Online** to show the Find Add-ons Online dialog. 
  4. **Type** "Script Editor Essentials" into the text box at the top of the Find Add-ons Online dialog. 
  5. Click on the **Search** button. 
  6. Once the search results are returned, **Select** the Script Editor Essentials Add-on if it is not already selected. 
  7. Click on the **Install** button to download, install and load the Script Editor Essentials Add-on. 
  8. Once the Script Editor Essentials Add-on is installed, **run** the following command from the embedded PowerShell console: 


`if

 (

-not



$oldState

) {


$PGSE

.

Configuration

[

'

/CollectAndSendInformation

'

] 

=



$false


}

`9. **Close** the PowerGUI Script Editor.

_If you are not connected to the Internet_

  1. Open your web browser and **browse** to [http://www.powergui.org/entry.jspa?externalID=2952][4].
  2. **Follow** the steps outlined in the "Manual install" section on that page, copying the Add-on.ScriptEditorEssentials.zip between machines as appropriate.
  3. **Close** the PowerGUI Script Editor.

At this point you should be able to double-click on ps1, psm1 or psd1 files if you file association is set up and have those files open in the PowerGUI Script Editor as the active document.

#### 

#### Feedback

This solution is being provided based on the feedback of users who notified us about the issue two days ago on the forums.  If you have any questions about this solution, please let us know in the forums or in the comments on this post.

Thanks!

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerGUI Pro](http://technorati.com/tags/PowerGUI+Pro),[PowerGUI](http://technorati.com/tags/PowerGUI),[hotfix](http://technorati.com/tags/hotfix)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/674/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/674/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=674&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://www.powergui.org/ "PowerGUI.org"
 [2]: http://www.powerguipro.com/ "PowerGUI Pro"
 [3]: http://www.powergui.org/entry.jspa?externalID=2952 "PowerGUI Script Editor Essentials Add-on"
 [4]: http://www.powergui.org/entry.jspa?externalID=2952 "http://www.powergui.org/entry.jspa?externalID=2952"

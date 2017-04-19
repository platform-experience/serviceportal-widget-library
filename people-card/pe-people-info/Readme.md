## Synopsis: People Info

![alt text](../../images/pe-people-info-01.png "People Info")

![alt text](../../images/pe-people-info-02.png "People Info - With option Only Picture set to True")

![alt text](../../images/pe-people-info-03.png "People Info - With option Job Title set to False")

![alt text](../../images/pe-people-info-04.png "People Info - With option Call And Chat set to False")

![alt text](../../images/pe-people-info-05.png "People Info - With option Show Text Below Picture set to True")

![alt text](../../images/pe-people-info-avatar-border.png "People Info - With option to Add border color around avatar")

This widget can be used to create a simple people card with user avatar, name, title, call and chat functionality.

***

## Installation

You can just download the update set **pe-people-info-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

We provide few options to load data easily and also to change the appearance of the widget.

**"User Sys ID"** This is to pass the user sys id you want to display. We pull all the user details associated with this sys_id. The default sys_id for this is **9ec35b8713453a007e94fc5ed144b09a**, which is demo user included as part of the update set.

**"Show Only Picture"** this is a boolean variable, when checked we only display the user avatar and nothing else. the default value for this is **false**

**"Show Job Title"** this is a boolean variable, when checked we show the user job tile below his name, default value here is **true**.

**"Show Call and Chat"** this is a boolean variable, when checked we show chat and call icons, default value here is **true**.

**"Show Text Below Picture"** this is a boolean variable, when checked we show the name below the picture, default value here is
 **false**.

 **"Add border color around avatar"** this takes a hex code for color, and adds it as border to img.

***

We provide four SASS variables to control the chat and call icon colors.

`$pe-brand-primary:#337ab7 !default;`

You can override these variables at portal level using the **themes**.






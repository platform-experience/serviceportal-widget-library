## Synopsis

This widget can be used to create a simple approval card with three button **Accept**,**Reject**,**View**. This widget also displays user avatar, name and title etc

***

## Installation

**Important note: This widget makes use of pe-people-info widget to display user avatar, name and title, so please install pe-people-info widget first**. Here is the link to [pe-people-info widget](https://gitlab.com/dev-practice/platexp-widget-library/tree/master/pe-people-info).

***


After installing above widget you can just download the update set **pe-approval-card-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

We provide options to make the it easy for to change **title**,**purpose titile** and **purpose icon** easily.

**title** the default message for this is **Destination Services.**

**purpose** the default message for this is **Relocation Package**

**icon** we make use of font-awesome icons for this option, default value here is **fa fa-bell fa-2x**, which is a bell icon. You can replace with any supported font-awesome class.



We provide four SASS variables to control the Button Text/Border Color, Font Awesome Icon Color.

`$pe-brand-success: #5cb85c !default;`

`$pe-brand-warning: #f0ad4e !default;`

`$pe-brand-danger: #d9534f !default;`

`$pe-brand-info: #5bc0de !default;`



You can overide these variables at portal level using the **themes**.






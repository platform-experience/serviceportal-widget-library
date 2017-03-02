## Synopsis

![alt text](https://gitlab.com/dev-practice/platexp-widget-library/raw/master/images/approval.png "Approval Card Widget")


This widget can be used to create a simple approval card with three button **Accept**,**Reject**,**View**. This widget also displays user avatar, name and title etc

***

## Installation

**Important note: This widget makes use of [pe-people-info widget](https://gitlab.com/dev-practice/platexp-widget-library/tree/master/pe-people-info) to display user avatar, name and title, this widget is already part of the update set.

People Info widget is injected dynamically in client controller.

```javascript
c.data.user_info = {
		user_sys_id: "9ec35b8713453a007e94fc5ed144b09a",
		show_only_picture: false,
		show_job_title: true,
		show_call_and_chat:false
	}
	
spUtil.get('pe-people-info',
	{
		user_sys_id: c.data.user_info.user_sys_id,
		show_job_title: c.data.user_info.show_job_title,
		show_call_and_chat: c.data.user_info.show_call_and_chat,
		show_only_picture: c.data.user_info.show_only_picture
			}).then(function(response){
			c.data.embedded_widget = response
	});
```

Since we dont want to show Call/Chat functionality the option **show_call_and_chat** is false.


***


After installing above widget you can just download the update set **pe-approval-card-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

We provide options to make the it easy for to change **title**,**purpose titile** and **purpose icon** easily.

**"title"** the default message for this is **Destination Services.**

**"purpose"** the default message for this is **Relocation Package**

**"icon"** we make use of font-awesome icons for this option, default value here is **fa fa-bell fa-2x**, which is a bell icon. You can replace with any supported font-awesome class.

***

We provide four SASS variables to control the Button Text/Border Color, Font Awesome Icon Color.

`$pe-brand-success: #5cb85c !default;`

`$pe-brand-warning: #f0ad4e !default;`

`$pe-brand-danger: #d9534f !default;`

`$pe-brand-info: #5bc0de !default;`



You can overide these variables at portal level using the **themes**.






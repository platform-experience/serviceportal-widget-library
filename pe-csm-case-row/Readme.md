## Synopsis: PE CSM case row

![alt text](../images/pe-csm-case-row.png "PE CSM case row")


This widget can be used to create a simple case card, with details like case number,person assigned, priority and short description.

***

## Installation

You can just download the update set **pe-csm-case-row.u-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page. This widget includes.

**Important note: This widget makes use of [pe-people-info widget](https://github.com/platform-experience/serviceportal-widget-library/tree/master/People%20Card/pe-people-info) to display user avatar, name and title, this widget is already part of the update set.

People Info widget is injected dynamically in client controller.

```javascript
c.data.user_info = {
  user_sys_id: '9ec35b8713453a007e94fc5ed144b09a',
  show_only_picture: false,
  show_job_title: true,
  show_call_and_chat:false,
  avatar_border:'#ddd'
}

spUtil.get('pe-people-info', {
  user_sys_id: c.data.user_info.user_sys_id,
  show_job_title: c.data.user_info.show_job_title,
  show_call_and_chat: c.data.user_info.show_call_and_chat,
  show_only_picture: c.data.user_info.show_only_picture,
  add_border_color_around_avatar: c.data.user_info.avatar_border
}).then(function(response) {
  c.data.embedded_widget = response;
});
```

Since we don't want to show Call/Chat functionality the option **show_call_and_chat** is false.


***







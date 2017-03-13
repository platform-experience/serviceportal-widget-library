## Synopsis: Overview Card Snippet

![alt text](../images/pe-overview-card-snippet.png "Status Card Snippet")

This snippet can be used to have a valid starting point for displaying a status card.

***

## Installation

Installation is very simple, you can just download the update set **pe-overview-card-snippet-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

**Important note: This widget makes use of [pe-people-info widget](https://github.com/platform-experience/serviceportal-widget-library/tree/master/People%20Card/pe-people-info) to display user avatar, name and title, this widget is already part of the update set.

People Info widget is injected dynamically in client controller.

```javascript
  spUtil.get('pe-people-info', {
    user_sys_id: c.data.user_sys_id,
    show_job_title: 'false',
    show_call_and_chat: 'false',
    show_only_picture: 'false',
    show_text_below_picture: 'true'
  }).then(function (response) {
    c.data.embedded_widget_1 = response;
  });
```

***

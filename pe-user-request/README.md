## Synopsis: User Request Widget

![](../images/pe-user-request-1.gif)

This can be used to quickly craft a user request widget.

## Installation

Installation is very simple, you can just download the update set "pe-user-request.u-update-set.xml" and install it on your instance. Then the widget is available for you to drag and drop on your page.

**Important note: This widget makes use of [pe-people-info widget](https://github.com/platform-experience/serviceportal-widget-library/tree/master/people-card/pe-people-info) to display the user avatar, name and title; this widget is already part of the update set.

People Info widget is injected dynamically in the client controller.

```javascript
function activateWidget() {
  spUtil.get('pe-people-info', {
    user_sys_id: c.data.userInfo.userSysId,
    show_job_title: c.data.userInfo.showJobTitle,
    show_call_and_chat: c.data.userInfo.showCallAndChat,
    show_only_picture: c.data.userInfo.showOnlyPicture
  }).then(function(response) {
    c.data.peopleInfoWidget = response;
  });
}

function getUserInfo() {
  c.data.userInfo = {
    userSysId: '20b26776dbc2720062e479daae9619dc',
    showOnlyPicture: c.options.show_only_pic,
    showJobTitle: c.options.show_job_title,
    showCallAndChat: c.options.show_call_chat
  };
}
```

Since we don't want to show call/chat functionality the option **show_call_and_chat** is toggled off.

## Configuration

We provide some options to configure the widget.

1. **"Header"** This is for changing the header text of the h2. The header, Request Requires Approval, will be the default if no option is defined.

1. **"Show Only Picture"** This is for enabling the ability to toggle the picture display. This will override and thus hide the job title, if enabled.

1. **"Show Job Title"** This is for enabling the ability to toggle the job title display.

1. **"Show Call & Chat"** This is for enabling the ability to toggle the call & chat display.
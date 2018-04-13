# Bootstrap Notify

## Description

This is a directive useful for being quickly able to use Bootstrap Notify from any widget (most of the times is placed in the header widget).

## Screenshots
![alt text](../images/pe-bootstrap-notify-01.png "Notifications indicator count") <br/><br/>
![alt text](../images/pe-bootstrap-notify-02.png "Notification with animation") <br/><br/>

## Additional Information/Notes
The update set installs a sample widget which shows how to use the directive and how to broadcast the notifications.<br/><br/>

The directive considers the following input parameters:

-) options, a json object (documented here: (http://bootstrap-notify.remabledesigns.com/#documentation-options) )

-) settings, a json object (documented here: (http://bootstrap-notify.remabledesigns.com/#documentation-settings) )

-) [optional] demo, if true then you will see a sample notification triggered automatically after a certain time

-) [optional] custom broadcast event name for triggering the notification, default name is: bn-notify-show. In a input object you can specify options and settings.

-) [optional] custom broadcast event name for showing the notification count value on UI, default name is: bn-notify-count
<br/><br/>
How to use it?

1) import the update-set

2) add bn.core as Dependency to your widget

3) add the directive to your widget in the HTML section:

<bn-notify demo=true></bn-notify>
<br/><br/>
Sample with input parameters:

<bn-notify options={...} settings={...}></bn-notify>

the purpose of the parameter demo, set to true, is to quicky test your options and settings.

Please have a look at the demo implementation on page and widget called Bootstrap Notify Demo:

(/sp?id=boostrap_notify_demo)

---
## Installation
---
Download and install update set **[pe-bootstrap-notify.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/notifications/pe-bootstrap-notify/pe-bootstrap-notify.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

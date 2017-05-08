## Synopsis: Status Alert Widget

![](../images/pe-status-alert-1.png "alert view")

![](../images/pe-status-alert-2.png "resolved")

This widget displays information from an alert about an incident with a chance of causing an outage.

## Installation

Installation is very simple, you can just download the update set "pe-status-alert.u-update-set.xml" and install it on your instance. Then the widget is available for you to drag and drop on your page.

## Configuration

Use the following options to configure the widget:

1. **alert**: Provide an anomaly alert's sys_id and data in the widget will display based on the alert. The widget's view will change if the alert is closed.

1. **probability**: Provide a number for the percent chance of an outage by a certain time.

1. **outage_eta**: Provide a datetime string for when an outage is expected. If not defined, the widget will count down to 30 minutes from when it is displayed.

## Sass Variables

The following Sass variables are given default values that can be overridden with theming or portal-level css.

```
$text-color: #485563 !default;
$status-alert-color: #ff6f00 !default;
$status-alert-gradient: linear-gradient(#fe8a30, #ff6f00) !default;
$status-recovered-color: #34ba3d !default;
$status-recovered-gradient: linear-gradient(#6ce474, #34ba3d) !default;
```
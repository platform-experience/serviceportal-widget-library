## Synopsis: Business Impact Widgets

![](../images/pe-root-cause-1a.png "collapsed")

![](../images/pe-root-cause-1b.png "expanded")

![](../images/pe-root-cause-2a.png "resolved")

This widget displays information related an identified root cause of an anomaly alert's related incident.

## Installation

Installation is very simple, you can just download the update set "pe-root-cause.u-update-set.xml" and install it on your instance. Then the widget is available for you to drag and drop on your page.

## Configuration

Use the following options to configure the widget:

1. **alert**: Provide an anomaly alert's sys_id and data in the widget will display based on related records.

1. **titleIconClasses**: Provide a set of Font Awesome css classes for an icon to display next to the title. Defaults to `'fa fa-bolt'`.

## Displayed Data

The provided anomaly alert sys_id determines what is displayed in the widget. The alert's associated records are displayed: a Configuration Item, and a Problem and a Change that has been identified as having caused the incident. From the Problem record, any other Incidents are listed in 'Related Incidents'.

## Bundled Widget

This widget makes use of the `pe-root-cause-details` widget, for the content of the expanded drawer. This additional widget is included in the update set.

The details widget can also be used on its own, given an anomaly alert's sys_id.

## Sass Variables

The following Sass variables are given default values that can be overridden with theming or portal-level css.

```
$icon-circle-color: #7e848b !default;
$text-color: #485563 !default;
$divider-color: #7E848B !default;
$status-alert-color: #ff6f00 !default;
$status-recovered-color: #34ba3d !default;
```

And for the drawer details:

```
$list-header-bg-color: #e8e8e8 !default;
$state-default-color: #557f90 !default;
$state-positive: #3abe43 !default;
$state-negative: #ff402c !default;
```
# People Card Flyout

## Description

This can be used to quickly craft a people card flyout widget with options.

## Screenshots

### Collapsed

![](../images/pe-people-card-flyout-collapsed.png)

### Expanded

![](../images/pe-people-card-flyout-expanded.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-people-card-flyout.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-people-card-flyout/pe-people-card-flyout.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Department` | This is the department id. | 0886 |
| `Title` | This is for changing the title in the panel header. | People at Risk |
| `Number 1` | This is for displaying the first integer in the panel body. | 1631 |
| `Number 3` | This is for displaying the third integer in the panel body. | 21 |
| `Sub Text 1` | This is for displaying the first sub-text copy. | Email Inboxes |
| `Sub Text 3` |This is for displaying the third sub-text copy. | Open Rate |

## Platform Dependencies

### SN System Tables

* sys_user
* department

## Sample Data and Data Structures

> See 'Configuration' above

## API Dependencies

*Dependencies are included and configured as part of the provided Update Set.*

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$pe-theme-color: #283347 !default;
$pe-theme-background-color: #1c2432 !default;
$pe-text-color: #fff !default;
$pe-sub-text-color: #68acd8 !default;
$pe-status-color-normal: #29bd00 !default;
```
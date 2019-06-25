# Three Tier ESC Header

## Description

The Three Tier ESC Header is a custom, responsive header.

## Screenshot

![Three Tier ESC Header](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-three-tier-esc-header/images/three-tier-esc-header.png)

## Additional Information/Notes

The widget is configured for use on an Employee Service Center portal.

## Installation

Download and install update set **[pe-three-tier-esc-header.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-three-tier-esc-header/pe-three-tier-esc-header.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> None

## Platform Dependencies

### System Plugins

* Human Resources Scoped App
* Virtual Agent

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

The widget is using default bootstrap variables and custom variables.   Use the branding editor to change the background color and text color of the first tier.  The second and third tiers can be modified by adding CSS variables to the portal record.  Navigate to Service Portal > Portals and select the Employee Service Center. In the CSS field of the portal record modify the following with the HEX code of the desired colors:
* $tier-2-background: #68a1af;
* $tier-2-text: #fff;
* $tier-3-background: #f6f6f6;


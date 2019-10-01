# Enhanced Header

## Description

The **Enhanced Header** emphasizes menu items with icons and and allows for several service catalog or link submenu items.

## Screenshot

![Enhanced Header](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-header/images/pe-enhanced-header.png)

![Enhanced Header Dropdown](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-header/images/pe-enhanced-header-dropdown.png)

## Additional Information/Notes

A sample portal, theme, and main menu are all included in the update set. To view the sample portal, go to `https://<instance>.service-now.com/enhanced_header`

## Installation

Download and install update set **[pe-enhanced-header.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-enhanced-header/pe-enhanced-header.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

- Adding the header to a portal requires two steps
	1. Set the portal theme's `Header` field to **Enhanced Header**.
	2. Set the portal main menu's `Widget` field to **Enhanced Header Menu Widget**.

- Currently the widget supports links with icons (glyphs) on the top level menu item and links and service catalog items on the sub menu items. These can be configured through the portal's main menu.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$navbar-default-bg: #f8f8f8 !default;
$navbar-default-link-color: $brand-primary !default;
$navbar-default-link-hover-color: darken($brand-primary, 6.5%) !default;
$pe-enhanced-header-icon-color: $navbar-default-link-color !default;
$pe-enhanced-header-icon-hover-color: $navbar-default-link-hover-color !default;
$pe-enhanced-header-divider-color: $sp-navbar-divider-color !default;
$pe-enhanced-header-divider-hover-color: $brand-primary !default;
$pe-enhanced-header-menu-item-bg: $navbar-default-bg !default;
```
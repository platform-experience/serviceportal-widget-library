# Sp Swapper

## Description

This widget allows the user to browse through different Portals from a bootstrap collapsed list that can be embedded in the header or wherever required.

## Screenshot

![Sp Swapper](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-swapper/images/pe-sp-swapper-01.gif)

## Additional Information/Notes

If the user clicks on the Logo, it does a redirect to the current portal homepage.
If the user does a mouse over on the logo, a chevron arrow will fade in and will become visible.
If the user clicks on the arrow, the list of Portals will kindly slide down and this is where the magic happens.
The component is massively using the ServiceNow and Bootstrap SASS variables defined in the selected Portal and Theme records, so to be coherent with the Portal Themes defined where executed.

## Installation

Download and install update set **[pe-sp-swapper.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sp-swapper/pe-sp-swapper.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

The input is an array of Portals from the available options in the widget instance, or from a settings property (x_pisn_sp_swapper.portals) because in the most use cases it will be embedded in the header where the Designer functionality is not available, and therefore adding options is not possible.
On both places, the value is a string with Portal SysIds separated by comma.
The images in the list are the Portal logo.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

collapse.js, Bootstrap flexible plugin that utilizes a handful of classes for easy toggle behavior. (already available in Service Portal)

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

Custom SASS variables with some default values (from Bootstrap variables defined in the Theme):

```sass
$x_pisn_sp_swapper-height: $navbar-height !default;
$x_pisn_sp_swapper-max-height: $sp-logo-max-height !default;
$x_pisn_sp_swapper-max-width: $sp-logo-max-width !default;
$x_pisn_sp_swapper-link-color: $navbar-inverse-link-color !default;
$x_pisn_sp_swapper-bg: $navbar-inverse-bg !default;
$x_pisn_sp_swapper-b-radius: 10px !default;
```

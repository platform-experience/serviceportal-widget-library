# Sticky Header

## Description

This header menu widget gives a portal a modern look and feel. This dynamic header draws attention to the menu items when first opening the page and then compresses as the user scrolls down.

## Screenshots

![Sticky Header](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sticky-header/images/pe-sticky-header.png)

![Sticky Header gif](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sticky-header/images/pe-sticky-header.gif)

## Additional Information/Notes

This widget is a modified Stock Header widget. It is best used on the Service Portal.

## Installation

Download and install update set **[pe-sticky-header.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sticky-header/pe-sticky-header.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

1. To use this widget on a portal, add it to the `Header` field on a portal's theme record. 

2. On the theme record, make sure that the `Fixed header` field is left unchecked.

3. The top logo image is pulled from the portal's `Logo` field. The lower logo image is pulled from the portal's `Icon` field. You may have to configure your portal form view to display the `Icon` field.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
/* Sticky Header SASS */
$pe-top-navbar-background-color: #293E40 !default; 
$pe-top-navbar-background-img: none !default;
$pe-top-navbar-height: 70px !default;

/* Bootstrap SASS */
$navbar-default-color: #777 !default;
$navbar-default-bg: #f8f8f8 !default;
$navbar-default-link-color: #777 !default;
$navbar-default-link-hover-color: #333 !default;
$sp-navbar-divider-color: solid thin #455464 !default;
```

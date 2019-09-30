# Order Guide Alt

## Description

An alternate version of the SC Order Guide widget, displaying included items on separate screens.

A "timeline" preloads the default included items, and updates based on rules set in the order guide.

![Order Guide Alt](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-guide-alt/images/pe-order-guide-alt.png)

## Additional Information/Notes

A page 'sc_order_guide_alt' is also included in the update set, containing the widget.

Some slight modifications to the form template are also included, primarily a substitution of buttons for Yes/No type variables. This can be altered in the related template record, or turned off by removing the 'template-url' attribute from the two 'ng-model's in the html.

## Installation

Download and install update set **[pe-order-guide-alt.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-order-guide-alt/pe-order-guide-alt.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/madrid-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
// for timeline
$tl-light: #ccc !default; // future steps
$tl-dark: $text-color !default; // past steps text
$tl-active: mix($brand-primary, black, 50%) !default; // active step
$tl-hover: $brand-primary !default;
$tl-indicator-size: 2rem !default;
$tl-first-last-width: 16rem !default;
$tl-line-weight: 2px !default;
```
# Collapsible Form

## Description

A direct alternative to Service Portal's Form widget, that adds Bootstrap collapse to each form section. Instead of requiring management of a completely reindexed form model by replacing input directives, this widget simply substitutes part of the Angular template HTML. Stylable indicators are added next to each section title.

## Screenshots

![Collapsible Form](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-collapsible-form/images/pe-collapsible-form.png)

![Collapsible Form Styled](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-collapsible-form/images/pe-collapsible-form-styled.png)

## Additional Information/Notes

The update set will also create a Portal page with id `form_collapsible`, containing the Collapsible Form widget.

The out-of-box form widget will receive some updates in the Madrid release family, so a new version of the Collapsible Form will be forthcoming to match. The current version is marked 'London' for clarity, but should be compatible in an upgraded instance, except for not reflecting some small style updates.

## Installation

Download and install update set **[pe-collapsible-form.u-update-set.xml](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-collapsible-form/pe-collapsible-form.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

Currently the styling of the indicators is based on Sass variables in the widget styles, and the icon hard-coded as a Font Awesome icon in the template markup. Currently these are not assignable by widget options.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$collapse-indicator-size: 30px !default;
$collapse-indicator-border-radius: $border-radius-base !default; // 50% for circles

// replace context, or define other colors
$collapse-indicator-bg: $panel-default-heading-bg !default;
$collapse-indicator-border: $btn-default-border !default;
$collapse-indicator-color: $btn-default-color !default;
```

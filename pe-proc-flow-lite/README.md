# Proc Flow Lite

## Description

The Proc Flow Lite widget shows the current state (state flow) of a worflow in real time, and in a more compact way than the Proc Flow does. You can read more about state flows on [Docs](https://docs.servicenow.com/bundle/madrid-servicenow-platform/page/administer/state-flows/concept/c_StateFlows.html)

## Screenshot

![Proc Flow Lite](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/pe-proc-flow-lite/images/pe-proc-flow-lite.png)

## Additional Information/Notes

It uses the SpUtil Watch functionality to represent the state flows in real time.

## Installation

Download and install update set **[pe-proc-flow-lite.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-proc-flow-lite/pe-proc-flow-lite.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

The widget requires in input (through URL parameter or input object if embedded) the following parameters:

* table: table containing the record

* sys_id: sys_id of the the record

## Platform Dependencies

The record needs to have state flows defined. If not provided out of the box for that table, then the user can easily add or customise them from the State Flows functionality within the platform.

### SN System Tables

You can use the Proc Flow Lite widget with any record in a table that uses states (tables derived from Task).

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
// Default Colors
$x-pisn-sp-procflow-lite-color: $text-color !default;
$x-pisn-sp-procflow-lite-bg: $brand-primary !default;
// "Current Stage" Colors
$x-pisn-sp-procflow-lite-current-color: lighten($x-pisn-sp-procflow-lite-bg, 95%) !default;
// "Past Stage" Colors
$x-pisn-sp-procflow-lite-past-color: lighten($x-pisn-sp-procflow-lite-bg, 45%) !default;
// "Future Stage" Colors
$x-pisn-sp-procflow-lite-future-color: lighten($x-pisn-sp-procflow-lite-bg, 20%) !default;
// Color of separator between Flow Stages
$x-pisn-sp-procflow-lite-separator-color: $body-bg !default;
// Sizing
$x-pisn-sp-procflow-lite-height: $line-height-computed * 2 !default;
$x-pisn-sp-procflow-lite-font-size: $font-size-small !default;
$x-pisn-sp-procflow-lite-border-radius: 15px;
```

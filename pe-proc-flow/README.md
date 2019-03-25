# Proc Flow

## Description

The Proc Flow widget shows the current state (state flow) of a worflow in real time. You can read more about state flows on [Docs](https://docs.servicenow.com/bundle/madrid-servicenow-platform/page/administer/state-flows/concept/c_StateFlows.html)

## Screenshot

![Proc Flow](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/pe-proc-flow/images/pe-proc-flow.png)

## Additional Information/Notes

It uses the SpUtil Watch functionality to represent the state flows in real time.

## Installation

Download and install update set **[pe-proc-flow.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-proc-flow/pe-proc-flow.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

The widget requires in input (through URL parameter or input object if embedded) the following parameters:

* table: table containing the record

* sys_id: sys_id of the the record

## Platform Dependencies

The record needs to have state flows defined. If not provided out of the box for that workflow, then the user can easily add or customise them from the State Flows functionality within the platform.

### SN System Tables

You can use the Proc Flow widget with any record in a table that uses states (tables derived from Task).

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
// Default Colors
$x-pisn-sp-procflow-color: $text-default !default;
$x-pisn-sp-procflow-bg: darken($body-bg, 5%) !default;

// "Current Stage" Colors
$x-pisn-sp-procflow-current-bg: $brand-primary !default;
$x-pisn-sp-procflow-current-color:  lighten($x-pisn-sp-procflow-current-bg, 45%) !default;

// "Past Stage" Colors
$x-pisn-sp-procflow-past-color: lighten($x-pisn-sp-procflow-current-bg, 45%) !default;
$x-pisn-sp-procflow-past-bg: lighten($x-pisn-sp-procflow-current-bg, 20%) !default;

// "Future Stage" Colors
$x-pisn-sp-procflow-future-color: lighten($x-pisn-sp-procflow-color, 10%) !default;
$x-pisn-sp-procflow-future-bg: $x-pisn-sp-procflow-bg !default;

// Color of border between Flow Stages
$x-pisn-sp-procflow-border-color: $body-bg !default;

$x-pisn-sp-procflow-tranistion-time: 0.5s !default;

// Sizing
$x-pisn-sp-procflow-border-radius: $border-radius-base !default;
$x-pisn-sp-procflow-height: 44px !default;
$x-pisn-sp-procflow-font-size: $font-size-small !default;
$x-pisn-sp-procflow-chevron-height: $x-pisn-sp-procflow-height / 2 !default;
$x-pisn-sp-procflow-chevron-width: 16px !default;
```

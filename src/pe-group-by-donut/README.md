# Group By Donut

## Description

A simple donut chart used to easily visualize groupings of records at a glance.

## Screenshot

![Group By Donut](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-group-by-donut/images/pe-group-by-donut.png)

## Additional Information/Notes

The colors displayed are the portal brand/theme colors.

## Installation

Download and install update set **[pe-group-by-donut.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-group-by-donut/pe-group-by-donut.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

### Usage

The Group By Donut Widget requires a table and a field to group by.

### Widget Option Schema

| Option | Default Value |
| :--- | :--- |
| `Table` | sn_customerservice_case |
| `Filter` | active=true |
| `Field` | priority |

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

* [Highcharts JS v5.0.14](https://www.highcharts.com)
* [highcharts-ng](https://github.com/pablojim/highcharts-ng)

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$pe-chart-title: #777 !default;
```

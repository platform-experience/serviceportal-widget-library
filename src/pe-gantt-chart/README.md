# Gantt Chart

## Description

This is used to create a simple Gantt Chart.

## Screenshot

![Gantt Chart](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/feature/src/pe-gantt-chart/images/pe-gantt-chart.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-gantt-chart.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-gantt-chart/pe-gantt-chart.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

Widget Options Schema parameters:
**"Type"** Glide List. `Default: Glide List`<br/>
**"Table"** Table from which to aggregate the data. `Overrides the Script Include parameter`<br/>
**"Advance"** A JSON block; used to set specific attributes of the chart. All attributes that are editable can be found here [Highcharts Documentation](http://api.highcharts.com/highcharts). <br/>

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>

* dhtmlx Gantt Chart API (v 6.1 - Recommended)  w/Export and No Data plug-ins
<br/>Latest version(s) available from [HighCharts.com](https://docs.dhtmlx.com/gantt/)


## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None

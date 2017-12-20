# Treemap Chart

## Description

This is used to create a simple Treemap

## Screenshots
![](../../images/pe-treemap-chart.png)
![alt text](../../images/pe-treemap-chart-modified.png "Modified Version Using Advanced")

## Additional Information/Notes
> None
---
## Installation
Download and install update set **[pe-treemap.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/highcharts/pe-treemap/pe-treemap.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

**"Update Interval"** Chart refresh interval.<br/>
**"Table"** Table from which to aggregate the data. `Overrides the Script Include parameter`<br/>
**"Fields"** Table fields used for the aggregation of data.<br/>
**"Encoded Query"** The encoded query limit the data returned.  `All data returned if empty.`<br/>
**"Script Include"** Used to get specific calculated data or more advanced data sets. By default this value is `"PEHighchartsExample"` for demo purposes. `Overridden if the 'Table' parameter is used.`<br/>
**"Function"** Function defined in the Script Include. `Default: "getDemoData"` for demo purposes<br/>
**"Parameter1"** A parameter passed/sent to the Script Include and Function combination.<br/>
**"Advance"** A JSON block; used to set specific attributes of the chart. All attributes that are editable can be found here [Highcharts Documentation](http://api.highcharts.com/highcharts). <br/>

Example:
```json
{
    "title":{
        "text":"Treemap",
        "style":{
            "color":"white"
        }
    },
    "options":{
        "exporting":{
            "enabled":false
        },
        "chart":{
			"backgroundColor":null
        },
		"plotOptions":{
			"series":{
				"animation":false,
					"dataLabels":{
		       			"enabled":false
				}
			}
		}
    }
}
```

In order to change the colors of the sections, you need to add a color attribute to the data returned.<br/>
A alternative way of doing this is using colorAxis documentation on this can be found here [Treemap Information](http://www.highcharts.com/docs/chart-and-series-types/treemap)

---
## Platform Dependencies
> None
---
## Sample Data and Data Structures
> None
---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>

* HighCharts API (v 5.0.5 - Recommended)  w/Export and No Data plug-ins
  <br/>Latest version(s) available from [HighCharts.com](http://http://www.highcharts.com/products/highcharts/)
  <br/>Additional HighCharts Utility - [highcharts-ng](https://github.com/pablojim/highcharts-ng) - Angular Directive for HighCharts (__not used or distributed__)

---
## CSS/SASS Variables
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
> None

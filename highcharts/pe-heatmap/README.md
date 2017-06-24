## Heatmap Chart

## Description

This is used to create a simple Heatmap

## Screenshots
![](../../images/pe-heatmap-chart.png)

## Additional Information/Notes 
> None
---
## Installation
---
Download and install update set **[pe-heatmap.u-update-set.xml](pe-heatmap.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)

---
## Configuration
---
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
	"title": {
		"text": "Heatmap"
	},
	"options": {
		"plotOptions": {
			"series": {
				"dataLabels": {
					"enabled": true
				}
			}
		},
		"colorAxis": {
			"min": 1,
			"max": 100,
			"minColor": "rgba(255, 0, 80, 0.2)",
			"maxColor": "rgba(255, 207, 96, 0.8)",
			"type": "linear"
		},
		"chart": {
			"plotBackgroundColor": {
				"linearGradient": {
					"x1": 1,
					"y1": 0,
					"x2": 0,
					"y2": 1
				},
				"stops": [
					[0, "rgba(255, 0, 80, 1)"],
					[1, "rgba(255, 207, 96, 1)"]
				]
			}
		}
	}
}
```


---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
> None
---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>

* HighCharts API (v 5.0.5 - Recommended)  w/Export and No Data plug-ins
  <br/>Latest version(s) available from [HighCharts.com](http://http://www.highcharts.com/products/highcharts/)
  <br/>Additional HighCharts Utility - [highcharts-ng](https://github.com/pablojim/highcharts-ng) - Angular Directive for HighCharts (__not used or distributed__)

---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
> None

## Synopsis: Solid Gauge

![](../../images/pe-solid-gauge-chart.png)
![](../../images/pe-solid-gauge-arc-chart.png)

This is used to create a simple Solid Gauge, or Solid Gauge Arc

## Installation

Installation is very simple, you can just download the update set "pe-solid-gauge.u-update-set.xml" and install it on your instance. Then the widget is available for you to drag and drop on your page.

## Configuration
We provide some options to configure the widget.

1. **"Update Interval"** This is how often you would like the data in the chart to be updated.

1. **"Table"** The table to aggregate upon. If this is filled in the Script Include Option is not needed and will be ignored.

1. **"Fields"** The fields to get a count of for the aggregation.

1. **"Encoded Query"** The encoded query to for specifying the data returned, otherwise all data from a data will be returned.

1. **"Script Include"** Instead of using a table to gather data this can be used to get specific calculated data or more advanced data sets. By default this value is "PEHighchartsExample" this is mostly for demo purposes.

1. **"Function"** A specific function to use in the selected script include. By default this is "getDemoData". This is for demo purposes.

1. **"Parameter1"** A parameter to send to the selected script include and function combination.

1. **"Advance"** A JSON block. For setting specific attributes of the chart. All attributes that are editable can be found here [Highcharts Documentation](http://api.highcharts.com/highcharts). A example of this is as follows.
```json
{
	"options":{
		"pane":{
			"background":{
				"shape":"solid",
				"innerRadius": "60%",
				"outerRadius": "100%"
			}
		},
		"chart":{
			"backgroundColor":null,
       "margin": [2, 0, 2, 0],
       "borderWidth":0,
       "height":310,
			"width":310
		},
		"exporting":{
			"enabled":false
		}
	},
	"yAxis":{
		"min":0,
		"max":100,
		"minColor":"rgba(128,0,128,.1)",
		"maxColor":"rgba(128,0,128,1)",
		"tickAmount":0,
		"tickWidth":0,
		"tickPositions":[]
	},
	"title":{
		"text":"Solid Gauge",
		"y":120,
		"style":{
			"color":"white"
		}
	}
}
```
![alt text](../../images/pe-solid-gauge-modified-chart.png "Modified Version Using Advanced")

To make a arc chart instead of a full circle the "Advance" option will need to be set like the following
```json
{
	"options":{
		"pane":{
		"startAngle": -90,
		"endAngle": 90,
		"background":{
			"shape":"arc",
		}
	}
}
```
The startAngle and endAngle can be changed to make many variations of this arc and do not have to be equal either.
![alt text](../../images/pe-solid-gauge-arc-modified-chart.png "Modified Version Using Advanced")
## Donut Chart Wizard

## Description

This widget can be used to represent data in a simple Donut Chart.

## Screenshots

![alt text](../../images/pe-donut-chart-wizard.png "Donut Chart Wizard")

## Additional Information/Notes 
> None
---
## Installation
---
Download and install update set **[pe-donut-chart-two.u-update-set.xml](pe-donut-chart-two.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)

---
## Configuration
---
Widget Option Schema parameters:

**"Primary Color"** <br/>
**"Background Color"** <br/>
**"Chart Width"** <br/>
**"Font Size"** <br/>
**"Font Width"** <br/>
**"Chart Data"** the value is a sample JSON object that you can copy from here:
```javascript
    {
      "label":"1/5",
      "current":1,
      "total":5
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

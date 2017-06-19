## Title - Business Unit Details (ITBM Experience)

## Description - Use Case

This widget provides the ability to cascade multiple panels of information and relevant data across small form factor elements.

## Screenshots
<table><tr style='vertical-align:top'><td>

### Collapsed
![](../images/pe-itbm-business-unit-details-1.png)
</td><td>

### Expanded
![](../images/pe-itbm-business-unit-details-2.png)
</td><td>

### Expanded Details
![](../images/pe-itbm-business-unit-details-3.png)
</td></tr></table>

## Additional Information/Notes 
> None
---
## Installation
---
Download and install update set **[pe-itbm-business-unit-details.u-update-set.xml](pe-itbm-business-unit-details.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)
---
## Configuration
---
Widget Option Schema parameters:
> None
---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
There are two types of sample data sets provided and included in the Server Script file.  
<br/>First, the data set that is used to build the multiple panels. 
<br/>And, the data set - chartOptions - used to build the two donut charts (ROI and RISK SCORE).
<br/>Both are included as part of the Server Script file.

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

`$bud-font-color: #65666A !default;`<br/>
`$bud-font-softcolor: #b4b2b3 !default;`<br/>
`$bud-background-color: #FFFFFF !default;`<br/>
`$bud-border-color: #E4E5E6 !default;`<br/>
`$bud-btn-border: #DBDAD6 !default;`<br/>
`$bud-red: #e51b24 !default;`<br/>
`$bud-orange: #e89033 !default;`<br/>
`$bud-green: #70BE5A !default;`<br/>
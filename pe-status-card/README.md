## Status Card

## Description

This widget can be used to quickly craft a status card with configurable options.

## Screenshots
![](../images/pe-status-card-1.png)

![](../images/pe-status-card-2.png)

## Additional Information/Notes 
> None
---
## Installation
---
Download and install update set **[pe-status-card.u-update-set.xml](pe-status-card.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)
---
## Configuration
---
Widget Option Schema parameters:

**"Title"** This is for changing the title in the panel header.<br/>
**"Status Number 1"** This is for displaying the first status integer in the panel body.<br/>
**"Status Number 2"** This is for displaying the second status integer in the panel body.<br/>
**"Status Number 3"** This is for displaying the third status integer in the panel body.<br/>
**"Sub Text 1"** This is for displaying the first sub-text copy.<br/>
**"Sub Text 2"** This is for displaying the second sub-text copy.<br/>
**"Sub Text 3"** This is for displaying the third sub-text copy.<br/>
**"Status Indicator 2"** Provides you a choice of status indicators, which you can select.<br/>
**"Status Indicator 3"** Provides you a choice of status indicators, which you can select.<br/>

### Status Indicator Choices
* danger
* normal
* warning

---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
> See 'Configuration' above
---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$pe-status-color-danger: #ff0050 !default;`<br/>
`$pe-status-color-normal: #6ee520 !default;`<br/>
`$pe-status-color-warning: #ffce00 !default;`<br/>
`$pe-anchor-color: #68acd8 !default;`<br/>
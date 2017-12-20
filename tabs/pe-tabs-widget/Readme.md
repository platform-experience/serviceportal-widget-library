# Dynamic Tabs

## Description

This can be used to quickly craft a tabs widget.

## Screenshots
### ViewLabel
![alt text](../../images/pe-dynamic-tabs-widget.png "Dynamic Tabs")

## Additional Information/Notes
> None
---
## Installation
Download and install update set **[pe-tabs-widget.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/tabs/pe-tabs-widget/pe-tabs-widget.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:
> None
---
## Platform Dependencies
> None
---
## Sample Data and Data Structures
There is a sample JSON available in the Tabs' Service UI script:
```javascript
var tabs = {
  firstTab: {
    name: 'Reclaimed vms',
    badgeNumber: 15,
    badgeColor: 'bg-red'
  },
  secondTab: {
    name: 'Expiring soon',
    badgeNumber: 5,
    badgeColor: 'bg-orange'
  },
  thirdTab: {
    name: 'new vms',
    badgeNumber: 10,
    badgeColor: 'bg-green'
  }
};
```
---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
>None
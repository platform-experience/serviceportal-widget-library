# FOEXP Devices

## Description

This widget shows a **Circle of Destiny** containing three types of technology devices that must be ordered. You can click through the device to bring up a list of devices in that category, and to order one. Upon successfully ordering a device, a status tick appears on the relevant circle.
***

## Screenshots
![Completion Task Widget](../images/pe-foexp-devices.gif "FOEXP Devices widget")

## Additional Information/Notes

Uses ServiceNow® [Service Catalog](https://docs.servicenow.com/bundle/istanbul-it-service-management/page/product/service-catalog-management/concept/c_ServiceCatalogManagement.html)

---
## Installation
---
Download and install update set **[pe-foexp-devices.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-foexp-devices/pe-foexp-devices-update-set.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/istanbul-application-development/page/build/system-update-sets/task/t_LoadCustomizationsFromAnXMLFile.html)

---
## Configuration
---
Widget Option Schema parameters:
> None
---
## Platform Dependencies
---
### SN System Tables
* sc_cat_item
* sc_req_item
---
## Sample Data and Data Structures
---
Sample data is provided as variables in the Server Script.
Configure the category sysids for the links on the home page using the three (3) variables at the top of the Server Script.
```javascript
var laptopsSysId = 'd258b953c611227a0146101fb1be7c31';
var phonesSysId = 'd68eb4d637b1300054b6a3549dbe5db2';
var tabletsSysId = 'b06546f23731300054b6a3549dbe5dd8';
```
---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$primary-color: #117fc1 !default;`<br/>
`$icon-color: white !default;`<br/>
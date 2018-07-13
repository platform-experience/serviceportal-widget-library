# PE CSM Case Status

## Description

This widget can be used to create a simple card to show the status of a incident/case.

Driven by **sn_customerservice_case** and **task_sla** tables, when a case sysid is provided in the Widget Schema options, the widget will fetch details from the record and the associated SLA for display.

## Screenshots
![alt text](../images/pe-csm-case-status.png "PE CSM Case status")

## Additional Information/Notes
See Platform Dependencies

---
## Installation
---
Ensure the that the Customer Service Management (and Demo Data, if necessary) application is Activated as referenced above.
Download and installation of update set **[pe-csm-case-row.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-csm-case-status/pe-csm-case-status.u-update-set.xml)** includes this widget.
<br/>After installation, the widget can be accessed via the Service Portal > Widgets section for use and customization.
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
---
Widget Option Schema parameters:

**Case Table** - Default: `sn_customerservice_case`<br/>
**SLA Table** - Default: `task_sla`<br/>
**Case Sys ID** -  This is a case record sysid. Demo value: `cf866683c3033100b12d9f2974d3ae1f`<br/>

---
## Platform Dependencies
---
### SN Plugin Support
Widget support is provided by the ServiceNow® [Customer Service Management](https://docs.servicenow.com/bundle/istanbul-service-management-for-the-enterprise/page/product/customer-service-management/concept/c_CustomerServiceManagement.html ) application.  Additionally, if not loading customer specific demo data; the [Customer Service Management Demo Data](https://docs.servicenow.com/bundle/istanbul-service-management-for-the-enterprise/page/product/customer-service-management/reference/r_CustServMgmtAddtlPluginsTable.html#r_additionaltableplugins) plugin should be Activated.

### SN System Tables

* sn_customerservice_case
* task_sla

---
## Sample Data and Data Structures
---
When a case sysid is provided in the Widget Schema options, the widget will fetch details from the record and the associated SLA for display.

---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
> None
# Remediation Actions

## Description

This widget displays choices for remediation actions.

## Screenshots
![](../images/pe-remediation-actions.png)

## Additional Information/Notes

Provide a sysid of an anomaly alert to the **alert** Widget Option schema. The widget will not display if the alert is closed.

---
## Installation
---
Ensure the that the **Performance Analytics - Content Pack - Event Management** plugin is Activated per the SN Plugin support section below.<br/><br/>
Download and install update set **[pe-remediation-actions.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-remediation-actions/pe-remediation-actions.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
---
Widget Option Schema parameters:

**alert**: Provide a specific *em_alert_anomaly* record sys_id to display.  `Default: Most recent record in the em_alert_anomaly table.`<br/>

---
## Platform Dependencies
---

### SN Plugin Support

Widget support is provided by the ServiceNow® [Performance Analytics - Content Pack - Event Management](https://docs.servicenow.com/bundle/istanbul-performance-analytics-and-reporting/page/use/performance-analytics/reference/r_PALandingPage.html)<br/>
Performance Analytics content pack for Event Management core out-of-the-box KPIs. <br/>
**For Customers:** _Activation of this plugin on production instances may require a separate Performance Analytics license. Contact ServiceNow for details._

### SN System Tables
* em_alert_anomaly

---
## Sample Data and Data Structures
---
With the Performance Analytics - Content Pack - Event Management installed the System table *em_alert_anomoly* is created.

---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$icon-circle-color: #7e848b !default;`<br/>
`$good-color: #3abe43 !default;`<br/>
`$bad-color: #ff402c !default;`<br/>

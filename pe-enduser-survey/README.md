# End User Survey

## Description

This can be used to display a list of a survey question's choices.

## Screenshots
![](../images/pe-enduser-survey.png)

## Additional Information/Notes

Uses the ServiceNow® [Assessments](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/administer/assessments/reference/r_Assessments.html?cshalt=yes ) application for data.

---
## Installation
---
Download and install update set **[pe-enduser-survey.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-enduser-survey/pe-enduser-survey.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/istanbul-application-development/page/build/system-update-sets/task/t_LoadCustomizationsFromAnXMLFile.html)

---
## Configuration
---
Widget Option Schema parameters:

**"question_id"** Specify a question sysid in order to display the question's options. `Default: f6d234ecdb9e32002e5df2b6ae9619b8`

---
## Platform Dependencies
---
### SN Plugin Support
Widget support is provided by the ServiceNow® [Assessments](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/administer/assessments/reference/r_Assessments.html?cshalt=yes ) application.
The Assessments plugin is enabled by default.

### SN System Tables
* asmt_metric
* asmt_metric_definition

---
## Sample Data and Data Structures
---
See Platform Dependencies

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
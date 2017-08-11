# Appointment Scheduler

## Description

This widget can be used to provide to the user a stylish way to arrange an appointment.

## Screenshots
![alt text](../images/pe-appointment-scheduler-01.png "Appointment Scheduler - Day selection")
![alt text](../images/pe-appointment-scheduler-02.png "Appointment Scheduler - Time selection")

## Additional Information/Notes
> None
---
## Installation
Download and install update set **[pe-appointment-scheduler.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-appointment-scheduler/pe-appointment-scheduler.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/istanbul-application-development/page/build/system-update-sets/task/t_LoadCustomizationsFromAnXMLFile.html)
---
## Configuration
Language variants can be created through the section System UI -> UI Messages, and displayed adding in the HTML body a statement with the syntax:<br/>
* ${<i>key value specified in the Message record</i>}.
---
## Platform Dependencies
> None
---
## Sample Data and Data Structures
> See 'Configuration' above
---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
The widget is using colors from Bootstrap SASS variables, and a minimal styles configuration to make it easy to customize and extend.
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

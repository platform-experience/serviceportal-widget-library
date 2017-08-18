# Incident Message

## Description

This widget can be used to quickly craft an incident or problem message with configuration.

## Screenshots
![](../images/pe-incident-message.png)

## Additional Information/Notes

A sample problem record is created and displayed by default. To display another problem, set the problem number option.

---

## Installation

Download and install update set **[pe-incident-message.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-incident-message/pe-incident-message.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/istanbul-application-development/page/build/system-update-sets/task/t_LoadCustomizationsFromAnXMLFile.html)

---

## Configuration

Widget Option Schema parameters:

**"Problem Number"** This is the problem number which is used to display problem data. If one is not provided, the default sample problem data will be displayed.<br/>

---

## Platform Dependencies

### SN System Tables
* problem
* sys_ui_message

---

## Sample Data and Data Structures

> See 'Configuration' above

---

## API Dependencies

<i>Dependencies are included and configured as part of the provided Update Set.</i>
* PE Incident Module
* PE Incident Service

---

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$pe-status-color-danger: #6b0022 !default;`<br/>
`$pe-badge-danger: #a40034 !default;`<br/>
`$pe-background-header-danger: #dd0047 !default;`<br/>
`$pe-background-body-danger: #be003d !default;`<br/>

## SUSH adding this for testing

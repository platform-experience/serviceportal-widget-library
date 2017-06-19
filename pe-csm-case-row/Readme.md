## Title - PE CSM Case Row

## Description - Use Case

This widget can be used to create a simple case card, with details like case number,person assigned, priority and short description.

## Screenshots
![alt text](../images/pe-csm-case-row.png "PE CSM case row")

## Additional Information/Notes 
This widget makes use of [pe-people-info](https://github.com/platform-experience/serviceportal-widget-library/tree/master/People%20Card/pe-people-info) widget to display user avatar, name and title, this widget is already part of the update set.

People Info widget is injected dynamically in client controller.

---
## Installation
---
Download and install update set **[pe-csm-case-row.u-update-set.xml](pe-csm-case-row.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)
---
## Configuration
---
Widget Option Schema parameters:

**User SysID** - Default: `9ec35b8713453a007e94fc5ed144b09a`<br/>
**Show Only Picture** - Default: `false`<br/>
**Show Job Title** -  Default: `true`<br/>
**Show Call and Chat** -  Default: `false`<br/>
**Header Title** - Demo value: `Case 101`<br/>

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
> None
# People Info

## Description

This widget can be used to create a simple people card with user avatar, name, title, call and chat functionality.

## Screenshots
![alt text](../../images/pe-people-info-01.png "People Info")
![alt text](../../images/pe-people-info-02.png "People Info - With option Only Picture set to True")
![alt text](../../images/pe-people-info-03.png "People Info - With option Job Title set to False")
![alt text](../../images/pe-people-info-04.png "People Info - With option Call And Chat set to False")
![alt text](../../images/pe-people-info-05.png "People Info - With option Show Text Below Picture set to True")
![alt text](../../images/pe-people-info-avatar-border.png "People Info - With option to Add border color around avatar")

## Additional Information/Notes
> None
---
## Installation
Download and install update set **[pe-people-info.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/people-card/pe-people-info/pe-people-info.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `User Sys ID` | This is to pass the user sys_id you want to display. We pull all the user details associated with this sys_id. | 9ec35b8713453a007e94fc5ed144b09a |
| `Show Only Picture` | This is a boolean variable, when checked we only display the user avatar and nothing else. | false |
| `Show Job Title` | This is a boolean variable, when checked we show the user job tile below his name. | true |
| `Show Call and Chat` | This is a boolean variable, when checked we show chat and call icons. | true |
| `Show Text Below Picture` | This is a boolean variable, when checked we show the name below the picture. | false |
| `Add border color around avatar` | This takes a hex code for color and adds it as a border to the image. |  |

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
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$pe-brand-primary: #337ab7 !default;
```
# Approval Card

## Description

Display a call to action with a background image, description and a count number based on a custom query.

## Screenshot
![alt text](../../images/pe-cta-count.png "Background Slideshow")

## Additional Information/Notes
> None

---
## Installation
---
Download and install update set **[pe-cta-count.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-cta-count/pe-cta-count.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Title` | Sets title to be displayed. |  |
| `Background Image` | Upload background image. |  |
| `Icon` | Upload icon to be displayed next to the title | null |
| `Table Name` | Table name you want to run the custom query against | null |
| `Conditions` | Conditions to run the custom query against (Open in platform for better experience) | null |

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

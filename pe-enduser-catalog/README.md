# End User Catalog

## Description

Displays a list of catalog items that are grouped by categories.

## Screenshots
![](../images/pe-enduser-catalog.png)

## Additional Information/Notes
> None
---
## Installation

Download and install update set **[pe-enduser-catalog.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-enduser-catalog/pe-enduser-catalog.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Encoded Query` | Sets the catalog. | PE Enduser Catalog |
| `Additional Query for Categories` | Sets the categories. | active=true^ORDERBYorder |
| `Additional Query for Items` | Sets the items. | sc_cat_item.active=true^ORDERBY sc_cat_item.order |

---
## Platform Dependencies

### SN System Tables
* sc_catalog
* sc_cat_item_category

---
## Sample Data and Data Structures

Any existing data in the instance where the Catalog Categories are Active (TRUE) and Catalog Items for each Category is Active (TRUE) [See Widget Options schema above]

---
## API Dependencies

<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$pe-description-color: #9fa4ad !default;
$pe-box-color: #fdfdfd !default;
$pe-green-item-color: #77b176 !default;
$pe-red-item-color: #dc7f63 !default;
$pe-yellow-item-color: #d7ba4b !default;
$pe-blue-item-color: #6d9dcd !default;
$pe-background-color: transparent !default;
```
## Title - End User Catalog

## Description - Use Case

Displays a list of catalog items that are grouped by categories.

## Screenshots
![](../images/pe-enduser-catalog.png)

## Additional Information/Notes 
> None
---
## Installation
---
Download and install update set **[pe-enduser-catalog.u-update-set.xml](pe-enduser-catalog.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)

---
## Configuration
---
Widget Option Schema parameters:

**"encoded_query"** This is for specifying a catalog. A default value of "title=PE Enduser Catalog" is given.

**"additional_query_for_categories"** This is for specifying categories to be shown. A default value of "active=true^ORDERBYorder" is given.

**"additional_query_for_items"** This is for specifying any items under the categories and catalog. A default value of "sc_cat_item.active=true^ORDERBY sc_cat_item.order" is given.

---
## Platform Dependencies
---
### SN System Tables
* sc_catalog
* sc_cat_item_category


---
## Sample Data and Data Structures
---
Any existing data in the instance where the Catalog Categories are Active (TRUE) and Catalog Items for each Category is Active (TRUE) [See Widget Options schema above]

---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>

(None)

---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$pe-description-color: #9fa4ad !default;`<br/>
`$pe-box-color: #fdfdfd !default;`<br/>
`$pe-green-item-color: #77b176 !default;`<br/>
`$pe-red-item-color: #dc7f63 !default;`<br/>
`$pe-yellow-item-color: #d7ba4b !default;`<br/>
`$pe-blue-item-color: #6d9dcd !default;`<br/>
`$pe-background-color: transparent !default;`<br/>
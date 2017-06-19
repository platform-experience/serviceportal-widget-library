## Title - Recommendation Cards Widget

## Description - Use Case

This can be used to quickly craft a set of recommendation cards.

## Screenshots
![](../images/pe-recommendation-cards-1.png)

## Additional Information/Notes 

Uses ServiceNow® [Service Catalog](https://docs.servicenow.com/bundle/istanbul-it-service-management/page/product/service-catalog-management/concept/c_ServiceCatalogManagement.html)

---
## Installation
---
Download and install update set **[pe-recommendation-cards.u-update-set.xml](pe-recommendation-cards.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)
---
## Configuration
---
Widget Option Schema parameters:

**"Title"** Widget Title.  `Default: Recommended for You`<br/>
**"Category"** This is for defining a category  `Default: PE My Devices`<br/>
**"Items"** This is for defining the item or items to display from the category using a comma separated list. For example: sc_cat_item.icon, sc_cat_item.name, etc.  `Default: sc_cat_item.name, sc_cat_item.icon, sc_cat_item.short_description`<br/>
**"Highlight"** This is for highlighting items, which adds a background color to the item or items using a comma separated list. For example: Office 2016, GL Reporting, etc.   `Default: Office 2016`<br/>

---
## Platform Dependencies
---
### SN System Tables
* sc_cat_item
* sc_cat_item_category
* sc_category
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
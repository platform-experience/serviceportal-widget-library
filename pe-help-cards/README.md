# Help Cards

## Description

This can be used to quickly craft a set of help cards.

## Screenshot
![](../images/pe-help-cards-1.png)

## Additional Information/Notes

Uses ServiceNow® [Service Catalog](https://docs.servicenow.com/bundle/jakarta-it-service-management/page/product/service-catalog-management/concept/c_ServiceCatalogManagement.html)

---

## Installation

Download and install update set **[pe-help-cards.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-help-cards/pe-help-cards.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---

## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Title` | Title of the card. | How can we help? |
| `Category` | Defines a category. | PE How Can We Help |
| `Items` | Defines the item or items to display from the category using a comma separated list. | sc_cat_item.name, sc_cat_item.icon |

---

## Platform Dependencies

### SN System Tables
* sc_cat_item
* sc_cat_item_category
* sc_category

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
> None
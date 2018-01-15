# Approval Card

## Description

Displays a list of news **featured image**, **headline**, and **description**.

## Screenshot
![alt text](../../images/pe-news-list.png "News List")

## Additional Information/Notes

> None

---
## Installation
---
Download and install update set **[pe-approval-card.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/approve-card/pe-approval-card/pe-approval-card.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Table` | Sets the table we will be quering against . | |
| `Featured Image` | Sets the column we will use as featured image. |  |
| `Limit` | Sets maximum records to display in the slideshow. | 5 |
| `Encoded Query` | Sets query to run against defined table. | |
| `Title Field` | Sets the column we will use as Title. |  |
| `Description Field` | Sets the column we will use as Description. |  |
| `Link` | Sets link the user will be taken once slideshow is clicked. |  |
| `Order` | Sets order records will be displayed. | Descending |
| `Order By` | Sets column records will be sorted by. |  |

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

```scss
```
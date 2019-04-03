# Enhanced List

## Description

Bring a more interactive and configurable presentation to showing the content of a table in a list format.  The Enhanced List widget brings several configurable options that give the user more options to view the data item. Additional capabilities include: Service Catalog links, Pagination of the content, View All and individual item Details link, Bootstrap Context assignement, and many more.

## Screenshots
### Configured - Default
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/default.png)
### Configured - Bootstrap Context
![Bootstrap Context](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/bootstrapcontext.png)
### Item Dropdown Choices
![Item Dropdown Choices](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/itemddlist.png)
### Pagination
![Pagination](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/pagination.png)
### Missing Configuration
![Missing Configuration](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/missingconfiguration.png)
### Instance Options
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/options1.png)
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/options2.png)
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-enhanced-list/images/options3.png)

## Additional Information/Notes

The Enhanced List widget provides the follow capabilities:
 * Choice of table, fields, View All link selection, individual item Details link
 * Links to Service Catalog items on the item's dropdown list.  
 * Provides Bootstrap Contexting of the UI Panel.
 * Pagination of the data presentation
 * MAX record count control

---
## Installation
Download and install update set **[pe-enhanced-list.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-enhanced-list/pe-enhanced-list.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

### Data
**Table** - Name of table to retrieve data from - e.g. task<br/>
**Fields** - Recommended maximum of 4 fields, comma delimited, and order controls column presentation `Default: number,short_description,assigned_to` <br/>
**Field Label Override** - comma delimited and order must match Field List order<br/>
**Image Field** - Field name in table storing an image<br/>
**Limit to User** - Limit query results to current user. Expects field named *assigned_to* existing in table<br/>
**Additional Data Filter** - using Encoded Query format, e.g.  active=true^start_date=today<br/>
**List Page Target** - Target Page for View All panel header link<br/>
**Detail Page Target** - Detail page target for item menu 'View Details' link<br/>
**Detail Page View** - View to use when target detail page is 'form', leave empty to use 'default' view<br/>
**Order By Field** - Table field to use for sorting the data `Default: sys_created_on` <br/>
**Use Order By in Descending Order** - Boolean toggle to change order by to descending order<br/>


### Presentation
**Service Catalog Menu Items** - Sys ID of catalog items as comma delimited, links added to item's action menu<br/>
**Pass Item's Sys ID to Service Catalog Item** - Pass the Item's Sys ID as a parameter to the Catalog Item selected<br/>
**Bootstrap Panel's Contextual alternatives** - changes the header and border to Bootstrap defined context colors<br/>
**List Pagination** - Paginate the list in groups of 5,10,15,25,50, or 100 items<br/>
**MAX Record Count** - Max number of records to return in query<br/>
**Date/Time Formatting** - Show all Date/Time fields as 1 - 'MM/DD/YYYY', 2- 'hh:mm:ss' , 3- 'MM/DD/YYYY hh:mm:ss', or 4 - No Format<br/>

### Behavior
**Show Widget's Panel Header** - Show panel header element<br/>
**User defined Panel Header Text** - Override the text for the Panel Header text<br/>
**Show Panel Footer** - Show panel footer element<br/>


---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables

$heading-color: #717171 !default;<br/>
$table-background: #ffffff !default;<br/>
$title-color: $text-color !default;<br/>
$wide-header-text-color: #4a4a4a !default;<br/>
$wide-header-text-size: 16px !default;<br/>
$details-color: $text-muted !default;<br/>
$table-bg-hover: rgba(0,0,0,0.05);<br/>
<br/>
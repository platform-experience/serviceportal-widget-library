# Highlight User Assets

## Description

The widget is configurable to display data from any table as either large buttons with a image/picture as the primary focus of the presentation.  However, the widget can be configured to show the data as buttons with just text about the item.

## Screenshots
### Configured - Default
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-highlight-user-assets/images/default.png)
### Configured - As Panel Buttons
![As Panel Buttons](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-highlight-user-assets/images/panelbuttons.png)
### Missing Configuration
![Missing Configuration](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-highlight-user-assets/images/missingconfiguration.png.png)
### Instance Options
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-highlight-user-assets/images/options1.png)
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-highlight-user-assets/images/options2.png)

## Additional Information/Notes
> None


---
## Installation
Download and install update set **[pe-highlight-user-assets.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-highlight-user-assets/pe-highlight-user-assets.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

### Data
**Table used to query data** - Name of table to retrieve data from - e.g. task<br/>
**Field name in table to use for the image caption** - Field name to use for the image caption<br/>
**Field name in table to use for the image sub-caption** - Additional text for sub-caption - e.g. Expiration Date<br/>
**Field name in table  to use for the image** - Field name in table for storing an image on the record<br/>
**Limit to User** - Limit query results to current user. Expects field named - assigned_to<br/>
**Additional Data Filter** - Additional query parameters to help reduce data set using Encoded Query format, e.g.  active=true^start_date=today <br/>
**List Page Target** - Target Page for View All panel header link<br/>
**Detail Page Target** - Detail page target for item menu 'View Details' link<br/>
**View name used by Detail Page Target** -leave empty to use default view <br/>

### Presentation
**Bootstrap Panel's Contextual alternatives** - changes the header and border to Bootstrap defined context colors<br/>
**Show as items as clickable panel button** - transform the content into a smaller button style<br/>
**Clickable Panel Button context** - Bootstrap Panel's Contextual alternatives - changes the background to Bootstrap defined context colors<br/>

---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables
> None

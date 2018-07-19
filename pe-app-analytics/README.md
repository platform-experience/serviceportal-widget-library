# App Analytics

## Description

This widget is a single page app alternative to the out of the box Site Analytics

## Additional Information/Notes
> None
---
## Installation
Download and install update set **[pe-app-analytics.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-app-analytics/pe-appointment-scheduler.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)
---
## Configuration
Widget Option Schema parameters:

**"tracking_id"** Google analytics tracking id. `Default: f6d234ecdb9e32002e5df2b6ae9619b8`

**"cookie_domain"** Used to initialized GA. `Default: The result of the following JavaScript expression:
document.location.hostname`

**"debug"** if True, data won't be sent to google and it will be displayed on console. `Default: False`

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
> None


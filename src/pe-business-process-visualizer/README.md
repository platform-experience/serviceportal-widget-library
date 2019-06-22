# Business Process Visualizer

## Description

The Business Process Visualizer presents the current active value of a choice field from a record.<br/><br/>
**Example:** You would like to show the progress of a ticket's state in an easy to view progress scale (as pictured below).<br/><br/>  Developed to be configurable through instance options or by passing key parameters by use of the URL.  The Business Process Visualizer can bring that one additional visual element of information to help improve the communication of where the item is in the process.

## Screenshots
### Configured - Default (Large)
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/default.png)
### Configured - Medium
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/medium.png)
### Configured - Small
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/small.png)
### Configured - Mobile (Full Scale)
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/mobile_full.png)
### Configured - Mobile (Current Only)
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/mobile_current.png)
### Configured - Custom Icons
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/custom_icons.png)
### Configured - Instance Options
![Bootstrap Context](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/instance_options.png)
### Configured - URL Parameters
![Bootstrap Context](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-business-process-visualizer/images/url_parameters.png)

---
## Installation
Download and install update set **[pe-business-process-visualizer.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-business-process-visualizer/pe-business-process-visualizer.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

### Data
**Table** - Name of table to retrieve data from - e.g. Incident<br/>
**Display Field** - Choice Field to reference in building the progress scale<br/>

### Presentation
**Caption** - Used to provide a top-centered caption for the widget.<br/>
**Default Icon** - System (Font Awesome) Icon to show in the center of each visual step<br/>
**Icons** - Using the Font Awesome collection, each step can be given an unique icon.  Each icon must be comma seperated - e.g. fa-check,fa-arrow-right,fa-pause,fa-check-circle,fa-times-circle,fa-ban<br/>
**Display Size** - Change the look between large, medium, and small dispaly sizes<br/>
**Mobile Show Scale** - When checked the full process scale is displayed on a mobile device instead of just the current/active stage.  (See 'mobile' images above)<br/>

### Behavior
**Invert Sequence** - Invert the sequence of the displayed stages<br/>
<br/>

---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables
Configurable by using the Branding Editor:<br/><br/>
$brand-success <br/>
$text-color <br/>
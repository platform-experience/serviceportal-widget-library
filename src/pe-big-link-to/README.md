# Big - Link To

## Description

The widget is an adaptation of the Link Button (Out of the Box) widget that provides a more feature rich collection of configurable options through the use of the Instance Options interface.

## Screenshots
### Configured - Default
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-big-link-to/images/default.png)
### Configured - Bootstrap Success
![Configured Bootstrap Success](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-big-link-to/images/success.png)
### Missing Link Configuration
![Missing Link Configuration](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-big-link-to/images/missingconfig.png)
### Instance Options
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-big-link-to/images/options1.png)
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-big-link-to/images/options2.png)
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-big-link-to/images/options3.png)


## Additional Information/Notes
> None

---
## Installation
Download and install update set **[pe-big-link-to.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-big-link-to/pe-big-link-to.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

### Presentation
**Title** - Text to show on the button <br/>
**Annotation** - Sub-Text to give additional context about the button<br/>
**Background URL** - URL to the image to show on the button<br/>
**Background Position** - Positioning location of the image<br/>
**Button Background Color** - Custom color setting of the button's backgroun - HEX, RGB, or web color names are valid values<br/>
**Button Minimum Height** - minimum height of the button <br/>
**Title Color** - Title text color - HEX, RGB, or web color names are valid values<br/>
**Annotation Color** - Sub-Text text color - HEX, RGB, or web color names are valid values<br/>
**Border Radius** - radius value of the button's border in pixels (px) - `Default: 4px`<br/>
**Bootstrap Panel's Contextual Alternatives** - Bootstrap Context Alternative choices (primary, success, info, etc.) to quickly color the button's background <br/>

### Behavior
**Order** - `Not Used` <br/>
**Target HREF** - specifies where to open the link <br/>
* _blank - Opens the link in a new window or tab
* _self - Opens the link in the same window/tab as it was clicked (this is default)
* _parent - Opens the link in the parent frame
* _top - Opens the link in the full body of the window
* _framename_ - Opens the link in a named frame

---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables
> None
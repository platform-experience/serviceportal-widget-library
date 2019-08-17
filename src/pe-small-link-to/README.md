# Small - Link To

## Description

The widget is an adaptation of the Link Button (Out of the Box) widget that provides a more feature rich collection of configurable options through the use of the Instance Options interface.

## Screenshots
### Configured - Default
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-small-link-to/images/default.png)
### Configured - Bootstrap Context Alternatives
![Context Alternatives](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-small-link-to/images/three.png)
### Missing Link Configuration
![Missing Link Configuration](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-small-link-to/images/missingconfig.png)
### Instance Options
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-small-link-to/images/options1.png)
![Instance Options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-small-link-to/images/options2.png)


## Additional Information/Notes
> None

---
## Installation
Download and install update set **[pe-small-link-to.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-small-link-to/pe-small-link-to.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

### Data
**Image Thumbnail** - path/name of image to use on the button

### Presentation
**Title** - Text to show on the button <br/>
**Image as Glyph** - Glyph selector for image to use on button. _Selection of Glyph image is priority and overrides Image Thumbnail_<br/>
**Glyph Color** - WebColor text value, HEX or RGBA() value to use in giving a color to the glyph image
**Annotation** - Sub-Text to give additional context about the button<br/>
**Button Background Color** - Custom color setting of the button's backgroun - HEX, RGB, or web color names are valid values<br/>
**Button Minimum Height** - minimum height of the button <br/>
**Title Color** - Title text color - HEX, RGB, or web color names are valid values<br/>
**Annotation Color** - Sub-Text text color - HEX, RGB, or web color names are valid values<br/>
**Border Radius** - radius value of the button's border in pixels (px) - `Default: 4px`<br/>
**Bootstrap Panel's Contextual Alternatives** - Bootstrap Context Alternative choices (primary, success, info, etc.) to quickly color the button's background <br/>

### Behavior
**Target HREF** - specifies the URL location the user will go to when clicked<br/>

---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables
> None
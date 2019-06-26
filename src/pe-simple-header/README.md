# Simple Header

## Description

A Simple and clean alternative to the Stock Header.  The name is a bit mis-leading, though the header widget is very 'simple' in the UI; it comes with A LOT of punch in functionality and flexibility. By default there is a different font used - "Gotham SSm A", "Gotham SSm B".  A built in 'back-to-top' element that appears when the page is scrolled. Ability to configure which Typeahead Widget to use for searching.  By using the 'Quick start config' of the portal record several elements of the header can be configured - search, secondary menu, live chat queue         to bring a rich experience to the user(s).

## Screenshots
### Madrid (La Jolla) Themed
![Madrid La Jolla](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/no-search.png)
### Background Override - Transparent
![Background Override](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/default-transparent.png)

### Secondary Menu Configured
![Secondary Menu](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/secondary-menu.png)<br/>
![Secondary Menu](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/secondary-menu-transparent.png)

### Search Box Showing
![Search Box](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/default.png)

### Example of Dropdown Menus
![Menus](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/menus.png)

### Mobile Responsive
![Mobile Default](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/mobile-default.png)<br/>
![Mobile Transparent](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/mobile-transparent.png)


---
## Installation
Download and install update set **[pe-simple-header.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-simple-header/pe-simple-header.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
By default there is nothing to configure.  Just set the Simple Header widget as the Header for the Theme and the Main menu for the portal.<br/>
<br/>
To gain additional capabilities and power from the header, the following JSON object items can be set in the Portal's __"Quick start config"__<br/>
```
[{
	"secondaryMenu": {"sys_id": "[[Menu sys_id GUID]]"},
	"useVirtualAgent": true,
	"default_interaction_queue": "[[Chat Queue sys_id GUID]]",
	"search":"typeahead-search"
}]
```
* __secondaryMenu__ - provide the Sys ID (GUID) for the Service Portal menu to be used below the Nav Logo (see images above)<br/>
* __useVirtualAgent__ - using this configuration will make the 'Live' chat become a link to the Virtual Agent interface<br/>
* __default_interaction_queue__ - common with CSM, but this Sys ID (GUID) will be used if the user's assigned interaction queue can not be determined<br/>
* __search__ - use this to activate and identify which typeahead widget should be used within the header. Shown in the configuration is the out-of-the-box (OOB) typeahead widget.  A great alternative is the [Search - For Headers widget](?state=widget-detail&sys_id=2dfb722bdb3f2f80d589f4621f96198d)<br/>
![Collapsed Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/search-custom-a.png)&nbsp;&nbsp;
![Open Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-simple-header/images/search-custom-b.png)

---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables
Used and configurable by using the Branding Editor:<br/>

__$text-color <br/>
$text-muted <br/>
$navbar-inverse-bg: transparent;<br/>
$navbar-inverse-link-color<br/>
$navbar-inverse-link-hover-color<br/>
$sp-navbar-divider-color<br/>
__<br/>
Values used to create the 'transparent' examples above:<br/>
__$navbar-inverse-bg: transparent;<br/>
$navbar-inverse-link-color: #293e40;<br/>
$navbar-inverse-link-hover-color: $brand-primary;<br/>
$sp-navbar-divider-color: transparent;<br/>
__

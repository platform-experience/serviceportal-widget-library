# Navigation - Left Collapsible

## Description

The Navigation - Left Collapsible is a Header/Footer Widget that is applied to a portal's Theme record like any other Header widget.  However, with this widget it is positioned to the Left edge of the browser.  Additionally, a Secondary Menu can be configured which renders across the top of the browser like a standard navigation header.  See Additional Information/Notes below for more detailed info about the widget's configuration possibilities and more.

## Screenshots
### Configured - Default
![Configured](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-navigation-left-collapsible/images/default.png)
### Configured - w/Secondary Menu
![Secondary Menu](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-navigation-left-collapsible/images/default2.png)
### Theme Record - Configuration
![Theme Record - Configuration](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-navigation-left-collapsible/images/themeconfig.png)

### Collapsed
![Collapsed](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-navigation-left-collapsible/images/collapsed.png)
![Collapsed](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-navigation-left-collapsible/images/collapsed2.png)


---
## Configuration

Portal record's 'Quick start config':

```
[{
	"auto_menu": true,
	"secondaryMenu": {"sys_id": "53616d1e3b013200367aee1234efc439"},
    "isCSM":true,
	"default_interaction_queue": "0e4d82d0738513000f4012562ef6a772"
}]
```

## Additional Information/Notes

* __Auto Menu__ - if you do not have a Service Portal Menu and would like to have menu options for the Portal Record's Knowledge Base and Catalog pages generate, then add the following to the 'Quick start config'.
```
[{
	"auto_menu": true
}]
```

* __Secondary Menu__ - There can be a 'top' navigation header that functions as a second menu.  To configure the Secondary Menu use the following syntax in the 'Quick start config' of the Portal record.
```
[{
	"secondaryMenu": {"sys_id": "53616d1e3b013200367aee1234efc439"}
}]
```

* __CSM Virtual Agent vs Live Connect__ -   The Virtual Agent will only launch if the Portal Record's 'Quick start config' is configured with a Secondary Menu.  If a Secondary Menu is not present then the Live Chat will still show in the left navigation list, however; it will only launch the Live Connect at this time. __Note__: the 'Chat Queue' for the portal must also be configured.  Example 'Quick start config':
```
[{
	"secondaryMenu": {"sys_id": "53616d1e3b013200367aee1234efc439"},
	"isCSM":true,
	"default_interaction_queue": "0e4d82d0738513000f4012562ef6a772"
}]
```

---
## Installation
Download and install update set **[pe-navigation-left-collapsible.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-navigation-left-collapsible/pe-navigation-left-collapsible.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)


---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables

**Override and control multiple aspects of the widget:**

//SN Branding Editor<br/>
$nav-header-bg-color: $navbar-inverse-bg !default;<br/>
<br/>
//Bootstrap Variables<br/>
$nav-pills-border-radius: $border-radius-base !default;<br/>
$nav-pills-active-link-hover-bg : $component-active-bg !default;<br/>
$nav-pills-active-link-hover-color: $component-active-color !default;<br/>
<br/>
// Widget Unique Variables Defaults<br/>
$nav-width: 235px !default;<br/>
$nav-width-collapsed: 80px !default;<br/>
$nav-header-height: 60px !default;<br/>
$nav-mobile-logo-maxwidth: 150px !default;<br/>
<br/>
$nav-pills-link-color: $navbar-inverse-link-color !default;<br/>
$nav-pills-link-bg: transparent !default;<br/>
$nav-pills-font-size: 16px !default;<br/>
$nav-pills-line-height: 20px !default;<br/>
$nav-pills-padding: 15px !default;<br/>
$nav-pills-icon-default: fa-square !default;<br/>
<br/>
$nav-secondary-height: $nav-header-height !default;<br/>
$nav-secondary-bg: transparent !default;<br/>
$nav-secondary-bottom-padding: 0px !default;<br/>
$nav-secondary-font-size: 16px !default;<br/>
$nav-secondary-line-height: 18px !default;<br/>
$nav-secondary-color: $text-muted !default;<br/>
$nav-secondary-active-link-hover-color: $text-color !default;<br/>
<br/>
$nav-stacked-gap: 6px !default;<br/>
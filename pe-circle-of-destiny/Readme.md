# Circle of Destiny

## Description

The Circle of Destiny widget allows you to create an element on your page which consists of a large central circle, surrounded by smaller circles.

All circles can have the following traits:

- Icon OR Image
- Label
- Hyperlink

The outer circles can have the following decorations added to them:

- Completion status (checkbox)
- Count


## Screenshots
![Circle of Destiny Widget](../images/pe-circle-of-destiny.png "Circle of Destiny Widget")

## Additional Information/Notes

If embedding the widget programatically, input needs to be supplied in a JSON format.<br/>

Example:
```
{
	label: 'test',
	icon: 'fa fa-users',
	url: 'https://www.gmail.com',
	color: 'pink',
	count: 30,
	items: [{
		label: 'Phones',
		url: 'https://www.google.com',
		icon: 'fa fa-users',
		completed: true
	},{
		label: 'Laptops',
		url: 'https://www.apple.com',
		icon: 'fa fa-book',
		completed: false,
		color: 'blue',
		count: 12
	},{
		label: 'Tablets',
		url: 'https://www.servicenow.com',
		icon: 'fa fa-calendar',
		completed: true
	}]
}
```
Using the above JSON would result in the below circle of destiny:

![Circle of Destiny Widget](../images/pe-circle-of-destiny-3.png "Circle of Destiny Widget")

---
## Installation
---

Download and install update set **[pe-circle-of-destiny-update-set.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-circle-of-destiny/pe-circle-of-destiny-update-set.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/istanbul-application-development/page/build/system-update-sets/task/t_LoadCustomizationsFromAnXMLFile.html)

---
## Configuration
---
There are a number of configuration options available.

- Radius: the radius of the circle on which the outer elements are placed.
- Start: the degree from the bottom middle at which the first element is placed.
- End: the degree from the bottom middle at which the last element is placed.
- Full: whether the circle is a complete circle. If it's a complete circle, we don't want to place an element on the last spot (as this would overlap the first).

To configure the elements in the circle of destiny (i.e. the surrounding circles) you need to click the hamburger menu in the options dialog and choose "Open in Platform".

![Circle of Destiny Widget](../images/pe-circle-of-destiny-2.png "Circle of Destiny Widget")

Widget Option Schema parameters:
> None
---
## Platform Dependencies
---
### SN Plugin Support
> None
### SN System Tables
* u_pe_cod_elements

---
## Sample Data and Data Structures
---
> ???
---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>

> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$pe-cod-border-color: grey !default;`<br/>
`$pe-cod-inner-bg: #3a3f51 !default;`<br/>
`$pe-cod-inner-color: white !default;`<br/>
`$pe-cod-inner-label: black !default;`<br/>
`$pe-cod-inner-font-size: 70px !default;`<br/>
`$pe-cod-inner-icon-size: 150px !default;`<br/>
`$pe-cod-outer-bg: #3a3f51 !default;`<br/>
`$pe-cod-outer-color: white !default;`<br/>
`$pe-cod-outer-label: black !default;`<br/>
`$pe-cod-outer-font-size: 30px !default;`<br/>
`$pe-cod-outer-icon-size: 80px !default;`<br/>
`$pe-cod-count-color: white !default;`<br/>
`$pe-cod-count-bg: red !default;`<br/>
`$pe-cod-count-border: white !default;`<br/>
`$pe-cod-success-color: green !default;`<br/>
`$pe-cod-success-bg: white !default;`<br/>
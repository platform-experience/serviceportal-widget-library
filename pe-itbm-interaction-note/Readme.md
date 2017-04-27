# Synopsis: ITBM Experience - Interaction Note (IU)


The widget provides and interactive form for capturing notes or reminder for posting back to an instance table/list.

![](../images/pe-itbm-interaction-note.png)
![](../images/pe-itbm-interaction-note-confirm.png)

***

## Installation

Download the update set **[.u-update-set.xml]()** and install to the desired instance.
<br/>After installation, the widget can be accessed via the Service Portal > Widgets section for use and customization.
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)

## Sample Data

This widget is reliant upon a System User Group in order to display the 'SPOKEN WITH' section of the widget.
The System User Group can be set in the Widget Options Schema or hard coded in the Server Script.
GlideRecord statement to retrieve users and supporting data element is already defined in the Server Script.


## CSS/SASS Variables

Following SASS variables are used to control colors of text, borders, status indicators, etc.<br/>
`$inf-font-color: #2E2E2E !default;`<br/>
`$inf-font-softcolor: #65666A !default;`<br/>
`$inf-font-notselected: #c2c2c2 !default;`<br/>
`$inf-background-color: #ffffff !default;`<br/>
`$inf-border-color: #E4E5E6 !default;`<br/>
`$inf-red: #E51B24 !default;`<br/>
`$inf-black: #000000 !default;`<br/>
`$inf-white: #ffffff !default;`<br/>
`$inf-green: #57B957 !default;`<br/>

## API Dependencies
<i>Not Applicable</i>

## Similar Widgets
<i>Not Applicable</i>

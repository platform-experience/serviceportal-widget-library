# Virtual Agent SP Widget V2

## Description

>It is not straight forward to change the VA floating button icon without editing the css of the widget, because the icon url is hardcoded. 
>
>In this widget I have extracted the icon url into widget options. If you use this widget instead of OOTB **Virtual Agent Service Portal Widget** you can switch out the icon easily. Also added an option to change color of the close icon that is visible when the VA is open.

## Screenshot

![Va Sp Widget V2](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-va-sp-widget-v2/images/va-floating-button.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-va-sp-widget-v2.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-va-sp-widget-v2/pe-va-sp-widget-v2.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

* Delete the OOTB VA widget from the page and Drag and drop **Virtual Agent Service Portal Widget-V2** widget.

* Click on pencil icon to open widget options.

![Va Sp Widget V2](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-va-sp-widget-v2/images/widget-options.png)

* **Floating Button Color** use this to configure the Background color of the Flaoting button. In our case I have configured it to be **white**.
* **Floating Button Icon** use this to configure new Icon  for the Floating button. This is `db_image` file name. In my case I have uploaded a new icon to `db-image` table called **now.png**. 

**_For Best result make sure the icon image is not a long word_**

![Va Sp Widget V2](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-va-sp-widget-v2/images/options-explain1.png)

* **Floating Button Cross Icon Color** use this option to change color of the Cross Icon that appears when VA is open.

![Va Sp Widget V2](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-va-sp-widget-v2/images/cross-icon.png)




## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None

# Widget Packs

## Description

Give portal users power to configure what widgets they see on the page. With Widget Packs on the page, users can click on the cog wheel icon to choose which widget they want to see on the page.

## Screenshot

![Widget Packs](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/pe-widget-packs.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-widget-packs.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-widget-packs/pe-widget-packs.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> Follow these steps to configure widget packs and widget.

* In left nav search for **Widget Packs**. You can all the parts that make the Widget Packs app.

	![Left Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/left-search.png)

* Click on **Packs** module. Now lets create a new pack.

	![Packs](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/packs.png)

* Give your widget pack a name, description and save it.

	![New Packs](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/packs-new.png)

*  Once you save the widget pack you should see a **Widgets and Packs** related list.

   ![Add Widget](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/add-widgets.png)

* Click on new to add widgets to the pack. For example I am adding OOTB **Weather** and **Cool Clock** widgets to the pack.

	![Widget Weather](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/weather-widget.png)

	![Widget Clock](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/clock.png)

* If your widget has some options you can add the options JSON object as well. Like above.
* Now Lets drag and drop the widget **Widget pack** widget onto the portal page.
* Configure the options by clicking on the pencil icon. Give it a title and choose the widget pack. Save.


	![Widget options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/options.png)


## Platform Dependencies

### Custom Tables

> Packs (u_packs)
> Widgets and packs (u_widgets_and_packs)
> User and widget (u_user_and_widget)
> Widget pack instance (u_widget_pack_instance)

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None

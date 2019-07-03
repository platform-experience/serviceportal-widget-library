# Impersonate Utility

## Description

With this widget you will be able to impersonate Users from a Service Portal page.

## Screenshot

![Impersonate Utility](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-impersonate-utility/images/pe-impersonate-utility.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-impersonate-utility.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-impersonate-utility/pe-impersonate-utility.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> Follow these steps to configure Impersonation Users.

* In left nav search for **Impersonation**. You can all the parts that make the Widget Packs app.

	![Left Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/left-nav.png)

* Click on **Impersonation Sets** module. Now lets create a new pack.

* Give your set a name, description and toggle active. Save it.

	![New Packs](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/new-set.png)

*  Once you save the widget pack you should see a **Users** related list. Click on New and start adding users using slush bucket.

   ![Add Widget](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/add-users.png)

* Your new set should look something like below.

   ![Add Widget](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/create-new-set.png)

* Now Lets drag and drop the widget **Impersonation Utility** widget onto the portal page.
* Configure the options by clicking on the pencil icon. Give it a title and Save.

	![Widget options](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-widget-packs/images/widget-option.png)

## Platform Dependencies

### Custom Tables

* `u_impersonation_set`
* `	u_m2m_users_impersonation_sets`

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None

# SP Guided Tour Overlay

## Description

This widget will improve the visibility of elements selected withi a Guide Tour darkening the rest of the page

## Screenshot

![SP Guided Tour Overlay](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-guided-tour-overlay/images/pe-sp-guided-tour-overlay.jpg)

## Installation

Download and install update set **[pe-sp-guided-tour-overlay.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sp-guided-tour-overlay/pe-sp-guided-tour-overlay.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

The widget needs to be available in a Service Portal page. We suggest to enable the functionality [embedding the widget] in the Header, so to have it always available and ready to enable itself in case of Guided Tour events ([here the list of events] with sample code).

[embedding the widget]: https://docs.servicenow.com/bundle/newyork-servicenow-platform/page/build/service-portal/concept/c_NestedWidgets.html
[here the list of events]: https://docs.servicenow.com/bundle/newyork-application-development/page/app-store/dev_portal/API_reference/guided_tours/concept/guided_toursAPI.html

## Platform Dependencies

* Guided Tours FW directive [spGtd]

* Guided Tours need to be enabled for the Service Portal where SP Guided Tour Overlay is intended to use. [This article] explains how to do it.

[This article]: https://docs.servicenow.com/bundle/newyork-platform-user-interface/page/build/help-guided-tours/task/activate-guidedtours-service-portal.html

### SN System Tables

* sys_embedded_tour_step: this table belongs to the Guide Tour FW and contains the CSS Selector for the target element (element selected during the Guided Tour design process in GTD)

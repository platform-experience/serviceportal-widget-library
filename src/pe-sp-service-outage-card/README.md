# Sp Service Outage Card

## Description

Having a Business Service in input, this minimalistic Bootstrap card is using the contextual colours, inherited from Bootstrap or customized in the Service Portal theme, to represent the outages and the Incident associated to them.

## Screenshot

![Sp Service Outage Card with active outage](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-service-outage-card/images/pe-sp-service-outage-card-01.png)

![Sp Service Outage Card with solved outage](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-service-outage-card/images/pe-sp-service-outage-card-02.png)

![See the incident record in a modal dialog without loosing the context](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-service-outage-card/images/pe-sp-service-outage-card-03.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-sp-service-outage-card.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sp-service-outage-card/pe-sp-service-outage-card.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

- SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

Drag the widget on the page. The widget needs a Business Service sysid in input. It can be retrieved from the URL, in input or from the options if the widget is embedded.

## Platform Dependencies

Configuration Management (CMDB) plugin

### SN System Tables

cmdb_ci_service, cmdb_ci_outage, incident

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

Bootstrap variables

```sass
$brand-danger
$brand-success
```

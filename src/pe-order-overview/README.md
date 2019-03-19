# Order Overview

## Description

A set of widgets and page based on order guide (og). The widgets show an overview of a given og: a description and its contents, including a featured item (the first listed in the og).

The user is given the choice of two actions: 'Add to Cart' immediately adds all items to the cart, and 'Customize Bundle' proceeds through the standard order guide procedure.

![Order Overview](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-overview/images/pe-order-overview.png)

Page `sc_og_overview` contains widget `sc-og-overview-page`, in which is embedded `sc-og-overview`. Given a `sys_id` in its url parameters, the page will show the full expanded overview for that og.

With no sys_id provided the page will show all ogs in the service catalog, with content details collapsed (expandable upon selection). In list view the page is given an assignable title (defaults to 'Bundled Orders'). If the page is given id parameters for `catalog` or `category`, the list becomes filtered and labeling changes accordingly.

![Order Overview](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-overview/images/pe-order-overview-list.png)

The independently configurable `sc-og-overview` can also be placed on other pages, and assigned a specific order guide, with basic user filters to determine which users it should be displayed for.

![Order Overview](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-overview/images/pe-order-overview-in-portal.png)

## Additional Information/Notes

Widget includes minimal styles, applied to Bootstrap standards, so can be easily influenced by theme. Screenshots show portal/page with Bootswatch theme 'United'.

## Installation

Download and install update set **[pe-order-overview.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-order-overview/pe-order-overview.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

See above.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None

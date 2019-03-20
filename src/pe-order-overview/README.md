# Order Overview

## Description

A set of widgets and page based on order guide. The widgets show an overview of a given order: a description and its contents, including a featured item (the first listed in the order guide).

The user is given the choice of two actions: 'Add to Cart' immediately adds all items to the cart, and 'Customize Bundle' proceeds through the standard order guide procedure.

![Order Overview](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-overview/images/pe-order-overview.png)

Page `sc_og_overview` contains widget `sc-og-overview-page`, in which is embedded `sc-og-overview`. Given a `sys_id` in its url parameters, the page will show the full expanded overview for that order guide.

With no sys_id provided the page will show all order guides in the service catalog, with content details collapsed (expandable upon selection). In list view the page is given an assignable title (defaults to 'Bundled Orders'). If the page is given id parameters for `catalog` or `category`, the list becomes filtered and labeling changes accordingly.

![Order Overview](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-overview/images/pe-order-overview-list.png)

The independently configurable `sc-og-overview` can also be placed on other pages, and assigned a specific order guide through widget options, with basic user filters to determine which users it should be displayed for. The attached source code is from this widget.

![Order Overview](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-order-overview/images/pe-order-overview-in-portal.png)

## Additional Information/Notes

The widgets include minimal styles, applied to Bootstrap standards, so can be easily influenced by theme. These screenshots show the portal/page with the Bootswatch theme 'United'.

## Installation

Download and install update set **[pe-order-overview.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-order-overview/pe-order-overview.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

### Order Overview

* Show to Users based on Query (e.g. location.country=USA) / `query_recommend`
* Collapse Included Items List (stays open if unchecked) / `collapse_items_list`
* Order Guide / `sys_id`
* Featured on Page (influences breadcrumbs, title) / `featured_on_page`

### Order Overview Page

Widget is influenced by parameters as decribed above.

## Platform Dependencies

### SN System Tables

`sc_cat_item_guide`

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None

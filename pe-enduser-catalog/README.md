## Synopsis: End User Catalog Widget

![](../images/pe-enduser-catalog.png)

This can be used to quickly craft a list of catalog items that are grouped by categories under that catalog item.

## Installation

Installation is very simple, you can just download the update set **pe-enduser-catalog.u-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

## Configuration

We provide 3 options to configure the widget.

1. **"encoded_query"** This is for specifying a catalog. A default value of "title=PE Enduser Catalog" is given.

1. **"additional_query_for_categories"** This is for specifying categories to be shown. A default value of "active=true^ORDERBYorder" is given.

1. **"additional_query_for_items"** This is for specifying any items under the categories and catalog. A default value of "sc_cat_item.active=true^ORDERBY sc_cat_item.order" is given.

## Sass Variables

We provide two Sass variables to control the button color.

`$pe-description-color: #9fa4ad !default;`

`$pe-box-color: #fdfdfd !default;`

`$pe-green-item-color: #77b176 !default;`

`$pe-red-item-color: #dc7f63 !default;`

`$pe-yellow-item-color: #d7ba4b !default;`

`$pe-blue-item-color: #6d9dcd !default;`

`$pe-background-color: transparent !default;`
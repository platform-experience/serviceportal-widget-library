## Synopsis: Horizontal Stacked Bar Widget

![alt text](../images/pe-horizontal-stacked-bar.png "Horizontal Stacked Bar Widget")

This widget can be used to create a horizontal stacked bar graph.

## Installation

Installation is very simple, you can just download the update set **pe-horizontal-stacked-bar-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

## Configuration

We provide a single option to make it easy to build the stacked bar graph:

**"Graph Data"**, the value is a sample JSON object, which is provided by default.

```javascript
[{
  "width": "60%",
  "color": "rgb(19, 35, 71)",
  "info_text": "AWS",
  "info_number": ""
}, {
  "width": "20%",
  "color": "rgb(28, 91, 125)",
  "info_text": "AZURE",
  "info_number": ""
}, {
  "width": "20%",
  "color": "rgb(150, 198, 200)",
  "info_text": "VMW",
  "info_number": ""
}]
```

## Sass Variables

We provide a SASS variable to control the graph color.

`$pe-brand-primary: #337ab7 !default;`

You can override these variables at portal level using the **themes**.
## Synopsis: Timeline Widget

![alt text](https://gitlab.com/dev-practice/platexp-widget-library/raw/master/images/pe-timeline-screenshot.png "Timeline Widget")

![alt text](https://gitlab.com/dev-practice/platexp-widget-library/raw/master/images/pe-timeline-screenshot-02.png "Timeline Widget - Collapsed")

![alt text](https://gitlab.com/dev-practice/platexp-widget-library/raw/master/images/pe-timeline-screenshot-03.png "Timeline Widget - In playback mode")

![alt text](https://gitlab.com/dev-practice/platexp-widget-library/raw/master/images/pe-timeline-screenshot-04.png "Timeline Widget - With the option Show Icons and Show Colors set to True")

![alt text](https://gitlab.com/dev-practice/platexp-widget-library/raw/master/images/pe-timeline-screenshot-05.png "Timeline Widget - With the option Show Colors set to True")

This widget can be used to quickly obtain an initial implementation of a timeline.

## Installation

Installation is very simple, you can just download the update set "pe-timeline-update-set.xml" and install it on your instance. Then the widget is available for you to drag and drop on your page.

We provide few options to load data easily and also to change the appearance of the widget.

**"Title"** This is for changing the title in the header

**"Show Icons"** This is for displaying the icons (font awesome or bootstrap) specified in the input data set, instead of the standard circle

**"Show Colors"** This is for displaying the colors specified in the input data set (attribute *color*), instead of the default one

**"Show Left Descriptions"** This is for displaying a text on the left for each element in the timeline

**"Initial Elements"** This is for defining how many elements displaying during the first visualization

***

We provide four SASS variables to control the color of the statistics shown in the timeline (both text and icon):

`$pe-timeline-items-color: #ff6f00 !default;`

You can override these variables at portal level using the **themes**.

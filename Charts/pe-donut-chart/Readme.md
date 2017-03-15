## Synopsis: Donut Chart

![alt text](../../images/pe-donut-chart.png "Donut Chart")

This widget can be used to quicly show a list of tabs, managin selection and with horizontal scrolling.

***

## Installation

Installation is very simple, you can just download the update set **pe-donut-chart-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

There is one option and a sample data set available in the Server script resource.

**"Title"** the default message for this is **Donut Chart**

**"Active Color"** this is the color of the part representing the information we want to display

**"Background Color"**

**"Font Awesome Icon"** this is the style for the icon available from http://fontawesome.io/icons/

***

To modify the percentage value, it is required to modify the CSS elements in *@keyframes donut-chart-1 {* **stroke-dashoffset** from 0 (100%) to the value of the circumference.



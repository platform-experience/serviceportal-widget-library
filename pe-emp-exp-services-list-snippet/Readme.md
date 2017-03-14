## Synopsis: Employee Experience Modal Snippet

![alt text](../images/pe-emp-exp-services-list "Services List")


This is the snippet to display list for services in employee experience.

## Installation

Installation is very simple, you can just download the update set "pe-emp-exp-services-list-snippet" and install it on your instance. Then the widget is available for you to drag and drop on your page. This widget is driven by the data injected into it.

```javascript
        //use moment js to get yesterday's date
       c.servicesList = [{
            name: "Household Goods Shipment",
            selected: true,
            icon: "#icon-shipment"
        }, {
            name: "Temporary Housing",
            selected: true,
            icon: "#icon-house"
        }, {
            name: "Rental Furniture",
            selected: false,
            icon: "#icon-furniture"
        }, {
            name: "Activate Utilities",
            selected: true,
            icon: "#icon-util"
        }, {
            name: "Temporary Cars",
            selected: false,
            icon: "#icon-car"
        }, {
            name: "Pet Services",
            selected: false,
            icon: "#icon-pet"
        }

    ]
```


***

We provide four SASS variables to control the color of the statistics shown in the timeline (both text and icon):

`$pe-blue-color: #268cf8 !default;`

You can override these variables at portal level using the **themes**.

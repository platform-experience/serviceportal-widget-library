## Synopsis: Dynamic Tabs Widget

![alt text](../images/pe-dynamic-tabs-widget.png "Tier Overview")

***

## Installation

Installation is very simple, you can just download the update set **pe-dynamic-tabs-widget-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

There is a sample JSON variable in the Client script:

```javascript
    {
    first_tab: {
      name: "Reclaimed vms",
      badge_number: 15,
      badge_color: "bg-red"

    },
    second_tab: {
      name: "Expiring soon",
      badge_number: 5,
      badge_color: "bg-orange"

    },

    third_tab: {
      name: "new vms",
      badge_number: 10,
      badge_color: "bg-green"
    }
  }
```
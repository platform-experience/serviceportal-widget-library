## Synopsis: Info Snippet
![](../images/pe-cloud-sprawl-info-snippet.png)

This snippet can be used to quickly obtain a card containing sub sections with data and a sample charts.

## Installation

Installation is very simple, you can just download the update set **pe-cloud-sprawl-info-snippet.u-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

A sample JSON object is defined in the client controller.

```javascript

c.userOne = {
    fname: "jose",
    lname: "riley",
    name: "Jose Riley",
    photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
    title: "Application Manager",
    phone: "8581234567",

    spending: [

      {
        text: "$8K this month",
        icon: "#icon-aws",
        company: "AWS"
      }, {
        text: "$22K this month",
        icon: "#icon-azure",
        company: "Azure"
      }
    ]
  };

```
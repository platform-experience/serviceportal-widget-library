## Synopsis: Info With User Snippet
![](../images/pe-cloud-sprawl-info-with-user-snippet.png)

This snippet can be used to quickly obtain a card containing sub sections with data and a sample charts.

## Installation

Installation is very simple, you can just download the update set **pe-cloud-sprawl-info-with-user-snippet.u-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

A sample JSON object is defined in the client controller.

```javascript

c.second_tab = {
    name: "expiring lease",
    badge_number: 5,
    badge_color: "bg-orange",
    list: [{
      icon: "#icon-azure",
      company: "Azure",
      lease: "Jan 5 2017",
      vimnumber: "VM1",
      vim_number: "",
      user: {
        fname: "edward",
        lname: "scott",
        name: "Edward Scott",
        photo: "47161dae1358fe00f7f5bcc32244b03c.iix",
        title: "IT Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-aws",
      company: "AWS",
      lease: "Feb 5 2017",
      vimnumber: "VM23",
      vim_number: "",
      user: {
        fname: "Andrew",
        lname: "Garner",
        name: "Jose Riley",
        photo: "90f8d5621398fe00f7f5bcc32244b00b.iix",
        title: "Application Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-aws",
      company: "AWS",
      lease: "Feb 5 2017",
      vimnumber: "VM13",
      vim_number: "",
      user: {
        fname: "jose",
        lname: "riley",
        name: "Jose Riley",
        photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
        title: "Application Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-aws",
      company: "AWS",
      lease: "Feb 25 2017",
      vimnumber: "VM4",
      vim_number: "",
      user: {
        fname: "greg",
        lname: "hill",
        name: "Greg Hill",
        photo: "743a51a21398fe00f7f5bcc32244b067.iix",
        title: "Application Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-aws",
      company: "AWS",
      lease: "Feb 35 2017",
      vimnumber: "VM5",
      vim_number: "",
      user: {
        fname: "David",
        lname: "Hoffman",
        name: "David Hoffman",
        photo: "22d959621398fe00f7f5bcc32244b0d2.iix",
        title: "Application Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-aws",
      company: "AWS",
      lease: "Feb 45 2017",
      vimnumber: "VM6",
      vim_number: "",
      user: {
        fname: "Gary",
        lname: "Kim",
        name: "Gary Kim",
        photo: "61ba9d621398fe00f7f5bcc32244b023.iix",
        title: "Application Manager",
        phone: "8581234567"
      }
    }, {

      icon: "#icon-azure",
      company: "Azure",
      lease: "Feb 5 2017",
      vimnumber: "VM17",
      vim_number: "",
      user: {
        fname: "edward",
        lname: "scott",
        name: "Edward Scott",
        photo: "47161dae1358fe00f7f5bcc32244b03c.iix",
        title: "IT Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-azure",
      company: "Azure",
      lease: "Feb 5 2017",
      vimnumber: "VM18",
      vim_number: "",
      user: {
        fname: "edward",
        lname: "scott",
        name: "Edward Scott",
        photo: "47161dae1358fe00f7f5bcc32244b03c.iix",
        title: "IT Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-vmware",
      company: "VMW",
      lease: "Feb 5 2017",
      vimnumber: "VM39",
      vim_number: "",
      user: {
        fname: "jose",
        lname: "riley",
        name: "Jose Riley",
        photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
        title: "Application Manager",
        phone: "8581234567"

      }
    }, {

      icon: "#icon-vmware",
      company: "VMW",
      lease: "Feb 5 2017",
      vimnumber: "VM10",
      vim_number: "",
      user: {
        fname: "jose",
        lname: "riley",
        name: "Jose Riley",
        photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
        title: "Application Manager",
        phone: "8581234567"

      }
    }]
  };

```
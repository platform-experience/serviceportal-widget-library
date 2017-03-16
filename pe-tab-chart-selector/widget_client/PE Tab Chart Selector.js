function TabChartSelector(spUtil) {
  /* widget controller */
  var c = this;

  spUtil.get('pe-donut-chart-wizard', {
    primary_color: c.data.chart_1.primary_color,
    background_color: c.data.chart_1.background_color,
    chart_width: c.data.chart_1.chart_width,
    font_size: c.data.chart_1.font_size,
    font_weight: c.data.chart_1.font_weight,
    chart_data: c.data.chart_1.data
  }).then(function (response) {
    c.data.embedded_widget_1 = response;
  });

  spUtil.get('pe-donut-chart-wizard', {
    primary_color: c.data.chart_2.primary_color,
    background_color: c.data.chart_2.background_color,
    chart_width: c.data.chart_2.chart_width,
    font_size: c.data.chart_2.font_size,
    font_weight: c.data.chart_2.font_weight,
    chart_data: c.data.chart_2.data
  }).then(function (response) {
    c.data.embedded_widget_2 = response;
  });


  c.selectedTab = 'unaccounted';

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
    },

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
  c.userTwo = {
    fname: "edward",
    lname: "scott",
    name: "Edward Scott",
    photo: "47161dae1358fe00f7f5bcc32244b03c.iix",
    title: "IT Manager",
    phone: "8581234567",

    spending: [

      {
        text: "$7K this month",
        icon: "#icon-aws",
        company: "AWS"
      }, {
        text: "$13K this month",
        icon: "#icon-azure",
        company: "Azure"
      }
    ]
  };


}
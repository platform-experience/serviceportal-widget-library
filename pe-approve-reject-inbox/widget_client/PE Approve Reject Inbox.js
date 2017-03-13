function ApproveRejectInbox() {
  /* widget controller */
  var c = this;


  c.graphdata = {};
  c.graphdata = {
    widget_heading: "cloud budget",

    left_info: {
      icon: "dollar-bag.png",
      number: "$230K",
      number_text: "Spent"

    },
    right_info: {
      type: "bar",
      bar_title: "5 days to $0",
      remaining: 46,
      total: 276
    },
    card_header: "budget requests",
    approvals: [{

        title: "Budget Request",
        sub_title: "Engineering",
        attention_text: "Tier 1",
        attention_icon: "fa-exclamation-circle",
        big_text: "$25k",
        state: "pending",
        //big_text_icon: "fa-money"
        big_text_icon: "coins.png"
      }

    ],

    graph_numbers: [{
        color: "#132347",
        width: "60%",
        info_text: "AWS"
        //info_number: "14"
      }, {
        color: "#1c5b7d",
        width: "20%",
        info_text: "AZURE"
        //info_number: "12"
      }, {
        color: "#96c6c8",
        width: "20%",
        info_text: "VMW"
        //info_number: "14"
      }

    ]


  };

}
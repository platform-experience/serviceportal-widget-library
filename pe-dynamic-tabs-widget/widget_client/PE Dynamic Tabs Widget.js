function DynamicTabsWidget($scope) {
  /* widget controller */
  var c = this;
  c.selectedTab = "expired";
  c.tabs = {
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
  };

}
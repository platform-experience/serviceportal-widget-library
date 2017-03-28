function CardUtilizationSnippet($scope) {
  /* widget controller */
  var c = this;
  $scope.getinitials = function (user) {

    var initials = "";
    if (user && !user.photo) {
      if (!user.first_name || !user.last_name) {
        initials = angular.uppercase(user.name.charAt(0));
      } else {
        initials = angular.uppercase(user.first_name.charAt(0));
        initials = initials + angular.uppercase(user.last_name.charAt(0));
      }

    }
    return initials;
  };

  c.company = {
    name: "AWS",
    icon: "#icon-aws",

    util_percent: "82%",
    underutil_percent: "10%",

    vm_list: [{
      vmnumber: "VM1",
      vm_number: "MARKETING",
      progress_text: "m1.large",
      progress: "32%",
      user: {
        fname: "jose",
        lname: "riley",
        name: "Jose Riley",
        photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
        title: "Application Manager",
        phone: "8581234567"

      }

    }, {
      vmnumber: "VM2",
      vm_number: "MARKETING",
      progress_text: "m1.large",
      progress: "28%",
      user: {
        fname: "jose",
        lname: "riley",
        name: "Jose Riley",
        photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
        title: "Application Manager",
        phone: "8581234567"

      }

    }, {
      vmnumber: "VM3",
      vm_number: "MARKETING",
      progress_text: "m1.large",
      progress: "18%",
      user: {
        fname: "jose",
        lname: "riley",
        name: "Jose Riley",
        photo: "fae1fa1013d07e00f7f5bcc32244b091.iix",
        title: "Application Manager",
        phone: "8581234567"

      }

    }],

  };

}
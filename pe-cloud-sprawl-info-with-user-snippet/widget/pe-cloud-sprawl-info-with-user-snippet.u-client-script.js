function InfoUserSnippet($scope) {
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

}
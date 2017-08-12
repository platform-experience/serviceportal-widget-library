function InteractionNoteController($scope, $rootScope, $q, $window, $document, $timeout, $http) {
  var inf = this;

  inf.users = [];
  inf.formData = {
    reminderDate: new Date(),
    reminderText: ''
  }
  for (var x = 0; x < inf.data.users.length; x++) {
    inf.users.push({
      'photo': inf.data.users[x].photo,
      'status': inf.data.users[x].status ? 'online' : 'offline'
    });
  }

  inf.btnClick = function (btn) {
    inf.selectedButton = btn;
    el = angular.element(document.getElementById("datepicker"));
    switch (btn) {
      case 1:
        inf.tomorrow();
        el.removeClass('in');
        break;
      case 2:
        inf.weekFromToday();
        el.removeClass('in');
        break;
      default:
        el.toggleClass('in');
        break;
    }
  }

  inf.showSubmit = function () {
    var goAnchor = document.getElementById("pageTop");
    goAnchor.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

    /*
    	EXAMPLE REST call to SUBMIT data to an instance table.
    */
    /**

    		// Change to appropriate instance table.
    		var table_name = "u_some_instance_table";

    		// Change 'u_tableField_*' references to appropriate fields.  Add additional if necessary.
    		var data_to_post = {
    			u_tableField_reminderText : inf.formData.reminderText,
    			u_tableField_reminderDate : inf.formData.reminderDate
    		}

    		var request = {
    			method: 'POST',
    			url: $window.location.origin+'/api/now/v2/table/' + table_name,
    			data: data_to_post
    		};

    		$http(request).success(function (response) {
    			console.log(response);
    		}).error(function (response) {
    			console.warn("~~ ERR: HTTP POST FAILED ~~");
    			console.warn(response);
    		});
    **/
  };

  inf.closeSubmit = function () {
    el = document.getElementById("overlay");
    el.style.visibility = "hidden";

    inf.cancelSubmit();
  };

  inf.cancelSubmit = function () {

    $window.history.back();
  };

  inf.selectedButton = 1;

  inf.today = function () {
    inf.formData.reminderDate = new Date();
  };

  inf.tomorrow = function () {
    var today = new Date();
    inf.formData.reminderDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  };
  inf.tomorrow();

  inf.weekFromToday = function () {
    var today = new Date();
    inf.formData.reminderDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  };

  inf.options = {
    minDate: new Date(),
    showWeeks: false
  };
}
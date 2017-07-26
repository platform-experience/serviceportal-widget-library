function feedbackController($q, $scope, $location, $rootScope, $timeout) {

    var c = this;

    c.autoHideDuration = 0.0;

    $scope.ErrMsg = "Unknown Error";
    $scope.feedbackError = false;
    $scope.autoHide = c.data.options.autoHideTY;

    $rootScope.$on('fbStyleButton', function(evt, objStyle) {
        $scope.fbDIVStyle = objStyle.div;
        $scope.fbButtonStyle = objStyle.button;
        $scope.fbLabelStyle = objStyle.label;
    });
    /*
    //Use broadcast as follows 
    $rootScope.$broadcast('fbStyleButton', {
    	div:{},
    	button : {
    		"background-color": "#09639b",
    		"box-shadow":"0 1px 4px 2px rgba(0, 0, 0, 0.2)"
    	},
    	label : {
    		"color" : "#ffffff"
    	}
    });
    */

    /* Scope Functions */
    $scope.initializeFeedback = function() {
        $scope.resetForm();

        $scope.$on('openFeedback', function(event, args) {
            $('#feedbackModal').modal('show');
        });

        $('#feedbackModal').on('shown.bs.modal', function() {
            //Make sure the modal and backdrop are siblings (changes the DOM)
            $(this).before($('.modal-backdrop'));
            //Make sure the z-index is higher than the backdrop
            $(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
            c.data.options.showFormButton = false;
        });

        $('#feedbackModal').on('hidden.bs.modal', function() {
            if ($scope.feedbackSubmitted) {
                $timeout(function() {
                    $scope.resetForm();
                    c.data.options.showFormButton = true;
                }, 250);
            }
        });

        $rootScope.$on('$locationChangeStart', function(evt) {
            $scope.resetForm();
        });

        console.log($scope);
        console.log(c);
    };

    $scope.submitFeedback = function() {
        if (ValidateEmail($scope.feedback.email)) {
            if (c.data.tblExists) {
                $scope.showModalInlay = false;
                $scope.feedbackSubmitting = true;

                postFeedback().then(function() {
                    $scope.feedbackSubmitting = false;
                    $scope.feedbackSubmitted = true;
                    $scope.showModalInlay = false;

                    if (c.data.options.autoHideTY) {
                        $timeout(function() {
                            $('#feedbackModal').modal('hide');
                        }, (c.autoHideDuration));
                    }

                });
            } else {
                $scope.ErrMsg = "DataTable configuration - Does not exist.";
                $scope.feedbackError = true;
            }
        }
    };

    $scope.resetError = function() {
        $scope.feedbackError = false;
    };

    $scope.resetForm = function() {
        if (c.data.options.autoHideTY) {
            c.autoHideDuration = parseFloat(c.data.options.autoHideDuration) * 1000;
        }
        $scope.feedback = {
            who: '',
            email: '',
            text: '',
            rating: -1,
            page_id: $scope.page.id,
            page_sysid: $scope.page.sys_id,
            portal: $scope.portal.title,
            portal_sysid: $scope.portal.sys_id,
            location: $location.url()
        };
        if (c.data.currentUser.loggedIn) {
            //c.data.options.showWho = false;
            $scope.userSysID = c.data.currentUser.sys_id;
            $scope.feedback.who = c.data.currentUser.name;
            $scope.feedback.email = c.data.currentUser.email;
        }
        $scope.showModalInlay = false;
        $scope.feedbackSubmitting = false;
        $scope.feedbackSubmitted = false;
    };

    /* Let's Go */
    $scope.initializeFeedback();

    /* Private Functions */
    function postFeedback() {
        var defer = $q.defer();
        c.server.get({ action: 'PostFeedback', feedback: $scope.feedback }).then(function(response) {
            if (response.data.sys_id) {
                defer.resolve();
            } else {
                defer.reject();
            }
        });
        return defer.promise;
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }
        $scope.ErrMsg = "Invalid Email";
        $scope.feedbackError = true;
        return (false);
    }
}
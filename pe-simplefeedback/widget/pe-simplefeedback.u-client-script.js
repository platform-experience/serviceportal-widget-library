function feedbackController($q, $scope, $http, $location, $window, $rootScope, $timeout, spUtil) {
    var c = this;
    c.autoHideDuration = 0.0;

    $scope.starClasses = {
        '1': 'starUnselected',
        '2': 'starUnselected',
        '3': 'starUnselected',
        '4': 'starUnselected',
        '5': 'starUnselected'
    };

    $scope.guid = null;
    $scope.guidLoading = false;
    $scope.ErrMsg = "Unknown Error";
    $scope.feedbackError = false;
    $scope.autoHide = c.data.wdtOptions.autoHideTY;

    $scope.initializeFeedback = function() {
        $scope.resetForm();

        $scope.$on('openFeedback', function(event, args) {
            $('#feedbackModal').modal('show');
        });

        $('#feedbackModal').on('hidden.bs.modal', function() {
            if ($scope.feedbackSubmitted) {
                $timeout(function() {
                    $scope.resetForm();
                }, 250);
                $scope.setupGUID();
            }
        });

        $scope.setupGUID();

        $rootScope.$on('$locationChangeStart', function(evt) {
            $scope.resetForm();
        });
    };

    $scope.setupGUID = function() {
        $scope.guidLoading = true;

        $scope.guidLoading = false;
    };

    $scope.submitFeedback = function() {
        var feedback = {};

        if (ValidateEmail($scope.feedback.email)) {
            if (c.data.tblExists) {
                $scope.showModalInlay = true;
                $scope.feedbackSubmitting = true;

                c.data.feedback = $scope.feedback;

                c.server.update().then(function(result) {
                    $scope.feedbackSubmitting = false;
                    $scope.feedbackSubmitted = true;
                    $scope.showModalInlay = false;
                }).then(function() {
                    if (c.data.wdtOptions.autoHideTY) {
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
        $scope.selectedStar = null;
        if (c.data.wdtOptions.showRating === 'false') {
            $scope.selectedStar = -1;
        }
        if (c.data.wdtOptions.autoHideTY) {
            c.autoHideDuration = parseFloat(c.data.wdtOptions.autoHideDuration) * 1000;
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
            c.data.wdtOptions.showWho = false;
            $scope.userSysID = c.data.currentUser.sys_id;
            $scope.feedback.who = c.data.currentUser.name;
            $scope.feedback.email = c.data.currentUser.email;
        }
        $scope.showModalInlay = false;
        $scope.feedbackSubmitting = false;
        $scope.feedbackSubmitted = false;
        $scope.offStarHover();
    };

    $scope.setSelectedStars = function(starNumber, setSelected) {
        if (!setSelected && $scope.selectedStar && starNumber <= $scope.selectedStar) {
            return;
        } else if (setSelected) {
            $scope.feedback.rating = $scope.selectedStar = starNumber;
        }
        for (var i = 1; i <= 5; i++) {
            if (i <= starNumber) {
                $scope.starClasses[String(i)] = 'starSelected';
            } else {
                $scope.starClasses[String(i)] = 'starUnselected';
            }
        }
    };

    $scope.offStarHover = function() {
        var selectedPoint = 0;
        if ($scope.selectedStar) {
            selectedPoint = $scope.selectedStar;
        }
        for (var i = 1; i <= 5; i++) {
            if (i <= selectedPoint) {
                $scope.starClasses[String(i)] = 'starSelected';
            } else {
                $scope.starClasses[String(i)] = 'starUnselected';
            }
        }
    };

    $scope.initializeFeedback();

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }
        $scope.ErrMsg = "Invalid Email";
        $scope.feedbackError = true;
        return (false);
    }
}
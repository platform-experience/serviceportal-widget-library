function TaskSignDocController($http, $rootScope, $sce, $scope, $timeout, $window, nowServer) {
  var c = this;

  c.$onInit = function() {
    $rootScope.wrapper.actionLabel = 'SIGN DOCUMENT';
    $rootScope.wrapper.actionEnabled = true;
    $rootScope.wrapper.action = displaySigningPad;

    if (c.data.task.state == '3') {
      $rootScope.wrapper.markAsComplete();
      $rootScope.wrapper.action = signatureCompleted;
    }
  };

  function signatureCompleted() {
    $scope.$emit('next-task', {});
  }

  function displaySigningPad() {
    c.signing = true;
    $rootScope.wrapper.actionLabel = 'SUBMIT';
    $rootScope.wrapper.action = submitSignature;
  }

  function submitSignature() {
    c.saveSignature(c.data.task.sys_id, c.data.user_id).then(function(value) {
      $scope.$emit('next-task', { changeState: true });
    });
  }

  var firstLoad = true;

  function injectCSS() {
    if (firstLoad) {
      $('iframe#sign-doc').load(function() {
        $('iframe#sign-doc')
          .contents()
          .find('head')
          .append($('<style type=\'text/css\'>  body>img {width:100%}  </style>'));
        firstLoad = false;
      });
    }
  }

  if (firstLoad) {
    $window.setInterval(injectCSS, 0);
  }

  c.showDoc = false;
  c.signed_name = '';
  $scope.showUpdating = false;
  $scope.currentTask = {};
  c.showSigPad = false;
  $scope.disableFinishButton = true;
  $scope.acknowledgeType = '';
  $scope.document_revision = '';
  $scope.documentBody = $sce.trustAsHtml($scope.data.documentBody);

  c.clearInput = function() {
    c.clearCanvas();
    c.signed_name = '';
  };

  c.clearCanvas = function() {
    c.sigPad.clearCanvas();
  };

  c.sigPad = null;
  c.isPopoverOpen = false;
  c.showPop = function() {
    c.clearInput();
    c.isPopoverOpen = true;
    $timeout(function() {
      c.onResize();
      c.initSignaturePad();
    });
  };

  c.hidePop = function() {
    c.clearInput();
    c.isPopoverOpen = false;
    c.showSigPad = false;
    $timeout(function() {
      c.initSignaturePad();
    }, 1000);
  };

  c.toggleSigPad = function() {
    c.showSigPad = !c.showSigPad;
    c.onResize();
    if (!c.showSigPad) {
      c.clearInput();
    }
  };

  $scope.getTasks = function(sys_id) {
    $scope.data.action = 'getTasks';
    $scope.data.sys_id = sys_id;
    $scope.server.update();
  };

  c.cancel = function() {
    c.signing = false;
    $rootScope.wrapper.actionLabel = 'SIGN DOCUMENT';
    $rootScope.wrapper.action = displaySigningPad;
  };

  /*    ------ IE Fixes -----
  * Returns true if end user's browser is IE 10,11or Edge
  * May need to update this check
  * as per updates in browsers user-agent
  */
  $scope.isIE = function() {
    return (
      /MSIE 10/i.test(navigator.userAgent) ||
      /rv:11.0/i.test(navigator.userAgent) ||
      /Edge\/\d./i.test(navigator.userAgent)
    );
  };

  c.doSaveSignature = function(actionName, table, document, image, data) {
    var n = {
      action: actionName,
      table: table,
      document: document,
      sp: true,
      time: new Date().getTime()
    };

    var da = {
      image: image,
      data: data
    };

    var dataURL = '';
    Object.keys(n).forEach(function(t) {
      dataURL += '&' + t + '=' + n[t];
    });

    return $http.post(nowServer.getURL('SignatureANGProcessor', dataURL), da);
  };
}

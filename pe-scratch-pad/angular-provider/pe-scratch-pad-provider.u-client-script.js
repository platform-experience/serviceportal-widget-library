function($interval, $timeout, $window, $rootScope) {
  var signaturePad, element, EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';
  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="signature" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
    scope: {
      accept: '=?',
      clear: '=?',
      dataurl: '=?',
      height: '@',
      width: '@',
      notifyDrawing: '&onDrawing',
    },
    controller: [
      '$scope',
      function($scope) {
        $scope.accept = function() {

          return {
            isEmpty: $scope.dataurl === EMPTY_IMAGE,
            dataUrl: $scope.dataurl
          };
        };

        $scope.onMouseup = function() {
          $scope.updateModel();
          $scope.notifyDrawing({
            drawing: false
          });
        };

        $scope.updateModel = function() {
          /*
           defer handling mouseup event until $scope.signaturePad handles
           first the same event
           */
          $timeout().then(function() {
            $scope.dataurl = $scope.signaturePad.isEmpty() ? EMPTY_IMAGE : $scope.signaturePad.toDataURL();
          });
        };

        $scope.clear = function() {
          $scope.signaturePad.clear();
          $scope.dataurl = EMPTY_IMAGE;
        };

        $scope.$watch("dataurl", function(dataUrl) {
          if (!dataUrl || $scope.signaturePad.toDataURL() === dataUrl) {
            return;
          }

          $scope.setDataUrl(dataUrl);
        });
      }
    ],
    link: function(scope, element, attrs, rootScope) {
      var canvas = element.find('canvas')[0];
      var parent = canvas.parentElement;
      var scale = 0;
      var ctx = canvas.getContext('2d');

      var width = parseInt(scope.width, 10);
      var height = parseInt(scope.height, 10);

      canvas.width = width;
      canvas.height = height;

      scope.signaturePad = new SignaturePad(canvas);

      scope.setDataUrl = function(dataUrl) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1, 1);

        scope.signaturePad.clear();
        scope.signaturePad.fromDataURL(dataUrl);

        $timeout().then(function() {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(1 / scale, 1 / scale);
        });
      };

      var calculateScale = function() {
        var scaleWidth = Math.min(parent.clientWidth / width, 1);
        var scaleHeight = Math.min(parent.clientHeight / height, 1);

        var newScale = Math.min(scaleWidth, scaleHeight);

        if (newScale === scale) {
          return;
        }

        var newWidth = width * newScale;
        var newHeight = height * newScale;
        canvas.style.height = Math.round(newHeight) + "px";
        canvas.style.width = Math.round(newWidth) + "px";

        scale = newScale;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / scale, 1 / scale);
      };

      var resizeIH = $interval(calculateScale, 200);
      scope.$on('$destroy', function() {
        $interval.cancel(resizeIH);
        resizeIH = null;
      });

      angular.element($window).bind('resize', calculateScale);
      scope.$on('$destroy', function() {
        angular.element($window).unbind('resize', calculateScale);
      });

      calculateScale();

      element.on('touchstart', onTouchstart);
      element.on('touchend', onTouchend);

      function onTouchstart() {
        scope.$apply(function() {
          // notify that drawing has started
          scope.notifyDrawing({
            drawing: true
          });
        });
      }

      function onTouchend() {
        scope.$apply(function() {
          // updateModel
          scope.updateModel();

          // notify that drawing has ended
          $rootScope.$broadcast('signDone', 'done');
          scope.notifyDrawing({
            drawing: false
          });
        });
      }
    }
  };
}
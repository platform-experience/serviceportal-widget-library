(function() {

  var donutTemplate = '<div class="progress-pie-chart ppc-{{randomID}}">' +
        '<div class="ppc-progress">' +
        '<div class="ppc-progress-fill"></div>' +
        '</div>' +
        '<div class="ppc-percents">' +
        '<div class="pcc-percents-wrapper">' +
        '<span ng-style="{\'font-size\':fontSize , \'font-weight\':fontWeight}">{{displayvalue}}</span>' +
        '</div>' +
        '</div>' +
        '</div>';

  angular.module('donutDirective', []).directive('donutDirective', function($timeout) {
    return {
      restrict: 'AE',
      // templateUrl: function (element, attrs) {
      //     return attrs.href;
      // },
      template: donutTemplate,
      scope: {
        count: '=',
        total: '=',
        displayvalue: '@',
        showValue: '=',
        showValueAsCount: '=',
        width: '=',
        colorFill: '@',
        colorBg: '@',
        inverted: '=',
        fontSize: '@',
        fontWeight: '='
      },
      link: function(scope, element, attrs) {
        //console.log("displayvalue " + scope.displayvalue);
        var randomId = Math.round((Math.random() * 100000000)),
          percent = (scope.count / scope.total) * 100,
          colors = undefined;

        if (scope.colorFill || scope.colorBg) {
          colors = {
            fill: scope.colorFill,
            bg: scope.colorBg
          };
        }
        scope.randomID = randomId;
        /*  $timeout(function(){
                 calculateDonut(scope.width, percent, scope.showValue,
                 scope.showValueAsCount, scope.count, colors, scope.inverted, randomId);
                 }, 1);*/


        scope.$watch(function(scope) {
          return scope.count;
        },
        function() {
          percent = (scope.count / scope.total) * 100;
          calculateDonut(scope.width, percent, scope.showValue,
            scope.showValueAsCount, scope.count, colors, scope.inverted, randomId, scope.displayvalue);
        }
        );
      }

    };

    function calculateDonut(width, percent, showValue, showValueAsCount, count, colors, inverted, id, displayvalue) {
      var $ = jQuery,
        ppc = $('.progress-pie-chart.ppc-' + id),
        ppcProgress = $('.ppc-' + id + ' .ppc-progress'),
        ppcProgressFill = $('.ppc-' + id + ' .ppc-progress-fill'),
        ppcPercents = $('.ppc-' + id + ' .ppc-percents'),
        deg = 360 * percent / 100,
        fontSize = width * 20 / 55;

      percent = parseInt(percent);
      width = parseInt(width);

      //Value display control - start
      if (showValue) {
        if (showValueAsCount)
        {ppcPercents.find('span').html(displayvalue);}
        else
        {ppcPercents.find('span').html(percent + '%');}
      }
      //Value display control - end

      //Invert the colors if needed
      if (inverted) {
        percent = 100 - percent;
        deg = 360 * percent / 100;
        colors = {
          fill: colors.bg,
          bg: colors.fill
        };
      }

      if (percent > 50) {
        ppc.addClass('gt-50');
      }
      ppcProgressFill.css('transform', 'rotate(' + deg + 'deg)');

      //Donut re-Size - start : change as per width specified
      ppc.add(ppcProgress).add(ppcProgressFill)
        .css({
          'width': width + 'px',
          'height': width + 'px'
        });
      ppcProgress.add(ppcProgressFill)
        .css({
          'left': 'calc(50% - ' + width / 2 + 'px)',
          'top': 'calc(50% - ' + width / 2 + 'px)'
        });

      if (percent > 50) {
        $('.gt-50.ppc-' + id + ' .ppc-progress').css('clip', 'rect(0,' + width / 2 + 'px,' + width + 'px,0)');
        $('.gt-50.ppc-' + id + ' .ppc-progress .ppc-progress-fill').css('clip', 'rect(0,' + width + 'px,' + width + 'px,' + width / 2 + 'px)');
      } else {
        ppcProgress.css('clip', 'rect(0,' + width + 'px,' + width + 'px,' + width / 2 + 'px)');
        ppcProgressFill.css('clip', 'rect(0,' + width / 2 + 'px,' + width + 'px,0)');
      }

      ppcPercents.css({
        'left': 'calc(50% - ' + (width - width / 5) / 2 + 'px)',
        'top': 'calc(50% - ' + (width - width / 5) / 2 + 'px)',
        'font-size': fontSize + 'px',
        'width': function() {
          if (width % 10 > 0)
          {return width - width / 5 - 1;}
          else {return width - width / 5;}
        },
        'height': function() {
          if (width % 10 > 0)
          {return width - width / 5 - 1;}
          else {return width - width / 5;}
        }
      });
      //Donut re-Sizing - end

      //change colors accordingly
      if (colors) {
        if (percent > 50) {
          if (colors.fill) {
            $('.progress-pie-chart.gt-50.ppc-' + id).css('background-color', colors.fill);
            ppcPercents.find('span').css('color', colors.fill);
          }
          if (colors.bg) {
            $('.gt-50.ppc-' + id + ' .ppc-progress .ppc-progress-fill').css('background-color', colors.bg);
          }
        } else {
          if (colors.fill) {
            ppcProgressFill.css('background-color', colors.fill);
            ppcPercents.find('span').css('color', colors.fill);
          }
          if (colors.bg) {
            ppc.css('background-color', colors.bg);
          }
        }
        if (inverted) {
          ppcPercents.find('span').css('color', colors.bg);
        }
      }
      //color change - end
    }
  });
})();

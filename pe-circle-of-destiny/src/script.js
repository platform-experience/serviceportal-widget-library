var PeCoD = angular.module('PeCircleOfDestiny', ['PeScale', 'PeOnRepeatComplete', 'PeConditionalLink']);

PeCoD.config(['$sceProvider',function($sceProvider){
    $sceProvider.enabled(false);
}]);



/**
 * @desc a highly-configurable "Circle of Destiny" directive
 * @example <pe-circle-of-destiny pe-cod-items="items" pe-cod-main="main"></pe-circle-of-destiny>
 */
PeCoD.directive('peCircleOfDestiny', function ($timeout) {

    var template = '<div class="pe-cod-container"><div class="pe-cod" pe-scale-to-parent="peCoDComplete">' +
        '<div class="pe-cod-inner">' +
        '<pe-cod-circle pecc-item="main" class="pe-cod-surrounded"></pe-cod-circle>' +
        '<ul><li ng-repeat="item in items track by $index" pe-on-repeat-complete="onRepeatComplete()">' +
        '<pe-cod-circle pecc-item="item" pecc-main="main" class="pe-cod-surrounding"></pe-cod-circle>' +
        '</li></ul></div></div></div>';

	/**
	 * @param scope
	 * @param elem
	 * @param attr
	 * @param attr.peCodRadius
	 * @param attr.peCodStart
	 * @param attr.peCodEnd
	 * @param attr.peCodFull
     * @param attr.peScaleToParent
	 */
	function link (scope, elem, attr) {
		// Set defaults
		var radius = attr.peCodRadius != undefined ? parseInt(attr.peCodRadius) : 320,
			start = attr.peCodStart != undefined ? parseInt(attr.peCodStart) : 0,
			end = attr.peCodEnd != undefined ? parseInt(attr.peCodEnd) : 360,
			full = attr.peCodFull != undefined ? (attr.peCodFull == 'true') : true;

        // resize the element based on radius (so that all the objects fit inside)
        elem.find('.pe-cod').width((radius * 2 + 180) + 'px');
        elem.find('.pe-cod').height((radius * 2 + 250) +  'px');

        scope.onRepeatComplete = function() {

            // Get elements & details
            var target = elem.find('.pe-cod-surrounded'),
                elements = elem.find('.pe-cod-surrounding'),
                count = elements.length,
                increment = 360,
                middle = {
                    left: null,
                    right: null
                };

            // Calculate degrees between each element
            if (count > 1) {
                increment = full ? ((end - start) / count) : ((end - start) / (count - 1));
            }

            // Where is the middle of the target element
            middle = {
                left: target.position().left + (target.width() / 2) + parseInt(target.css('margin-left')),
                top: target.position().top + (target.height() / 2) + parseInt(target.css('margin-top'))
            };

            // Loop through each element
            elements.each(function (index) {

                // Determine the positioning of the element
                var angleDeg = (start + (index * increment)),
                    angleRad = angleDeg * Math.PI / 180,
                    top = Math.cos(angleRad) * radius + middle.top,
                    left = Math.sin(angleRad) * radius + middle.left;

                // Apply the positioning to the element
                $(this).css({
                    left: left + 'px',
                    top: top + 'px'
                });
            });

            $timeout(function () {
                scope.$broadcast('peCoDComplete');
            });

        };
	}


	return {
		restrict: 'E',
		scope: {
			items: '=peCodItems',
			main: '=peCodMain'
		},
		template: template,
		link: link
	}
});

/**
 * @desc a highly-configurable "Circle of Destiny" directive
 * @example <pe-circle-of-destiny pe-cod-items="items" pe-cod-main="main"></pe-circle-of-destiny>
 */
PeCoD.directive('peCodCircle', function () {

    var template = '<pe-conditional-link pecl-href="{{::item.url}}"><div class="pe-cod-circle" ng-style="::dynStyle">' +
        '<div class="pe-cod-icon"><i class="{{::item.icon}}" aria-hidden="true" ng-if="::!item.image"></i></div>' +
        '<div class="pe-cod-status" ng-if="::item.completed" ng-class="{success: item.completed}">' +
        '<i class="fa fa-check-circle" aria-hidden="true"></i></div>' +
        '<div class="pe-cod-count" ng-if="::item.count">{{::item.count}}</div>' +
        '<div class="pe-cod-label">{{::item.label}}</div></div></pe-conditional-link>';

    /**
     *
     * @param scope.peccItem
     * @param scope.peccMain
     */
    function link (scope) {

        if (scope.peccItem === undefined) {
            scope.item = scope.peccMain;
        } else {
            scope.item = scope.peccItem;
        }

        scope.dynStyle = {};

        if (scope.item.image != undefined) {
            scope.dynStyle['background-image'] = 'url(' + scope.item.image + ')';
        }

        if (scope.item.color != undefined) {
            scope.dynStyle['background-color'] = scope.item.color;
        }
    }

	return {
		restrict: 'E',
        scope: {
            peccMain: '=',
            peccItem: '='
        },
		template: template,
        link: link
	}
});







var PeScale = angular.module('PeScale', []);

PeScale.directive('peScaleToParent', function(PeScaleService) {

    /**
     *
     * @param attr.peScaleToParent
     */
    function link (scope, elem, attr) {
        PeScaleService.addElement(elem);

        if (attr.peScaleToParent != undefined) {
            scope.$on(attr.peScaleToParent, function () {
                PeScaleService.scaleElementsToFit();
            });
        }
    }

	return {
		restrict: 'A',
		link: link
	};
});

PeScale.service('PeScaleService', function($window) {
	var listening = false;
	var elements = [];

    /**
     * Adds input to the array of elements to be scaled when the window is resized.
     * @param toAdd the jQuery object which should be added
     */
	function addElement (toAdd) {
        toAdd.css({ 'transform-origin': 'top left' });

		elements.push({
            elem: toAdd,
            original: { height: null, width: null }
        });

        listen();
	}

    /**
     * Binds the handler to the window resize event, one time only.
     */
    function listen() {
	    // Ensure the handler is only bound to the event once.
        if (listening === false) {
            angular.element($window).resize(scaleElementsToFit);
            listening = true;
        }
    }

    /**
     * Scales the input element to fit within it's parent.
     * @param toScale a jQuery element to be scaled down to fit within it's parent.
     */
    function scaleThis(toScale) {

	    // Reset back to full scale
        toScale.elem.css({ transform: "scale(1)" });

        // Ensure we've captured the original height & width
        if (!toScale.original.height && !toScale.original.width) {
            toScale.original.height = toScale.elem.height();
            toScale.original.width = toScale.elem.width();
        }

        // Find out the scale of the element compared to it's parent
        var scale = toScale.elem.parent().width() / toScale.elem.width();

        if (scale > 1) {
            scale = 1;
        }

        toScale.elem.css({
            transform: "scale(" + scale + ")"
        });

        /* And reduce the height of the parent by the same amount as a css scaled element still takes up the same
         amount of space as it's original size. */
        var newHeight = toScale.original.height * scale;
        toScale.elem.parent().height(newHeight);
    }

    /**
     * Handler that will be called when the window is resized
     */
    function scaleElementsToFit() {
        for (var i = 0; i < elements.length; i++) {
            scaleThis(elements[i]);
        }
    }

    return {
        scaleElementsToFit: scaleElementsToFit,
        addElement: addElement
    };
});


angular.module('PeOnRepeatComplete', [])
    .directive('peOnRepeatComplete', function ($timeout) {

        /**
         * @param attr.peOnRepeatComplete
         */
        function link (scope, elem, attr) {
            // inspiration: http://bit.ly/2piMWrN
            if (scope.$last === true) {
                $timeout(function () {
                 scope.$eval(attr.peOnRepeatComplete);
                });
            }
        }

        return {
            link: link
        };
    });

angular.module('PeConditionalLink', [])
    .directive('peConditionalLink', function () {

        var template = '<a href="{{href}}" ng-if="href" ng-transclude></a><div ng-if="!href" ng-transclude></div>';

        /**
         * @param attr.peclHref
         */
        function link (scope, elem, attr) {
            scope.href = attr.peclHref;
        }

        return {
            restrict: 'E',
            template: template,
            transclude: true,
            link: link
        };
    });
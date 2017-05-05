function CoDCtrl ($scope, $timeout, $element) {
	var c = this;
	
	if (c.data.embedOpt != undefined) {
		// This is an embedded widget
		c.items = c.data.embedOpt.items;
		
		c.main = {
			label: c.data.embedOpt.label,
			icon: c.data.embedOpt.icon,
			url: c.data.embedOpt.url,
			color: c.data.embedOpt.color,
			image: c.data.embedOpt.image
		};
		
		c.options.u_radius = c.data.embedOpt.radius;
		c.options.u_start = c.data.embedOpt.start;
		c.options.u_end = c.data.embedOpt.end;
		c.options.u_full = c.data.embedOpt.full;
		
	} else {
		// This is a widget instance
		c.items = c.data.items;
		
		c.main = {
			label: c.options.u_label,
			icon: c.options.u_icon,
			url: c.options.url,
			color: c.options.u_color,
			image: c.options.u_image
		};
		
	}
	
	// The message that will be broadcast once the circles have been positioned.
	c.broadcast = 'peCoDComplete';
	
	// Set defaults
	var radius = c.options.u_radius != undefined ? parseInt(c.options.u_radius) : 320,
			start = c.options.u_start != undefined ? parseInt(c.options.u_start) : 0,
			end = c.options.u_end != undefined ? parseInt(c.options.u_end) : 360,
			full = c.options.u_full != undefined ? (c.options.u_full) : true;

	
	// resize the element based on radius (so that all the objects fit inside)
  $element.find('.pe-cod').width((radius * 2 + 180) + 'px');
  $element.find('.pe-cod').height((radius * 2 + 250) +  'px');
	
	c.onRepeatComplete = function() {
		
		// Get elements & details
		var target = $element.find('.pe-cod-surrounded'),
				elements = $element.find('.pe-cod-surrounding'),
				count = elements.length,
				increment = 360;

		// Calculate degrees between each element
		if (count > 1) {
			increment = full ? ((end - start) / count) : ((end - start) / (count - 1));
		}

		// Where is the middle of the target element
		var middle = {
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
		
		// Broadcast the message so that the element can be scaled down to fit.
		$timeout(function () {
			scope.$broadcast(c.broadcast);
		});
		
	};
}
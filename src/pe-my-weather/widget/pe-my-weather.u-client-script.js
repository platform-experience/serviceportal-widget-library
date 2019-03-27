function MyWeatherController() {
	var c = this;
	c.$onInit = function () {
		c.getWeather = getWeather;
		c.getWeather();
	};

	function getWeather(){
		if (navigator.geolocation) {
			var location_timeout = setTimeout("geolocFail()", 10000);

			navigator.geolocation.getCurrentPosition(function(position) {
				clearTimeout(location_timeout);
				c.server.get({
					browserLocation: true,
					lat:position.coords.latitude,
					lng:position.coords.longitude
				}).then(function(r) {
					c.weather = r.data;
				});
			}, function(error) {
				clearTimeout(location_timeout);
				geolocFail();
			});
		} else {
			// Fallback for no geolocation
			geolocFail();
		}

	}

	function geolocFail(){
		c.server.get({
			browserLocation: false,
		}).then(function(r) {
			c.weather = r.data;
		});
	}
}
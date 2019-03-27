(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	var apikey = gs.getProperty('openweathermap.apikey');


	if(input){
		if(input.browserLocation){
			var ws = new GlideHTTPRequest
			("https://api.openweathermap.org/data/2.5/weather?lat="+input.lat+"&lon="+input.lng+"&appid="+apikey+"&units=imperial");

			var response = ws.get();
			if (response) {
				var responseBody = JSON.parse(response.getBody());
				$sp.log(responseBody);
				if (response != null) {
					data.errorMessage = false;
					data.channel = responseBody;
					data.IconUrl = "https://openweathermap.org/img/w/" +
					data.channel.weather[0].icon + ".png";
					data.code = responseBody.sys.country;
					data.main = responseBody.main;

				} else {
					data.errorMessage = gs.getMessage("Can't find weather") + ": " + input.place;
				}
			} else {
				data.errorMessage = gs.getMessage("An error occurred while making the requested connection");
			}
		}
		if(!input.browserLocation){
			var rec = new GlideRecord('sys_user');
			rec.get(gs.getUserID());
			if(rec.location){
				data.location = rec.location.city.replaceAll(' ', '%20');
			}

			$sp.log(data.location);
			var ws = new GlideHTTPRequest
			("https://api.openweathermap.org/data/2.5/weather?q="+data.location+"&appid="+apikey+"&units=imperial");

			var response = ws.get();
			if (response) {
				var responseBody = JSON.parse(response.getBody());
				$sp.log(responseBody);
				if (response != null) {
					data.errorMessage = false;
					data.channel = responseBody;
					data.IconUrl = "https://openweathermap.org/img/w/" +
					data.channel.weather[0].icon + ".png";
					data.code = responseBody.sys.country;
					data.main = responseBody.main;
				} else {
					data.errorMessage = gs.getMessage("Can't find weather") + ": " + input.place;
				}
			} else {
				data.errorMessage = gs.getMessage("An error occurred while making the requested connection");
			}

		}

	}
})();
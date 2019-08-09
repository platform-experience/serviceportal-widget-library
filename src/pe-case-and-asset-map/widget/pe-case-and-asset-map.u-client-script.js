<<<<<<< HEAD
function MapPageController($scope, $rootScope, $window,$location, $anchorScroll, $timeout, leafletData, $q) {
=======
function mapPageCtrl($scope, $rootScope, $window,$location, $anchorScroll, $timeout, leafletData, $q) {
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
	/* widget controller */
	var c = this;
	$scope.firstFlip = true;
	$location.hash('ff');
	
<<<<<<< HEAD
	
=======
	$rootScope.$broadcast('refreshFooterUrl');
	
	c.loading = true;
	c.liveApp = false;
	c.masterMarkers = [];
	c.markers = [];	
	c.masterList = [];
	c.list = []
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42

	c.awesomeMarkerIconCurrentLocation = {
		type: 'awesomeMarker',
		icon: 'user',
		markerColor: 'green',
		prefix: 'fa',
		iconColor: '#fff'
	};
	c.awesomeMarkerIconComputer = {
		type: 'awesomeMarker',
		icon: 'desktop',
		markerColor: 'blue',
		prefix: 'fa',
		iconColor: '#fff'
	};
	c.awesomeMarkerIconConsumable = {
		type: 'awesomeMarker',
		icon: 'keyboard',
		markerColor: 'blue',
		prefix: 'fa',
		iconColor: '#fff'
	};
	c.awesomeMarkerIconCase = {
		type: 'awesomeMarker',
		icon: 'exclamation-circle',
		markerColor: 'blue',
		prefix: 'fa',
		iconColor: '#fff'
	};

	//Center of the USA
	c.centerLocation = {
		lat: 37.3382,
		lng: 121.8863,
		zoom: 3,
		icon: c.awesomeMarkerIconCurrentLocation
	}
	c.startLocation = {
		lat: 37.3382,
		lng: 121.8863,
		zoom: 3,
		icon: c.awesomeMarkerIconCurrentLocation
	}
	function getDeviceLocation() {
		var defer = $q.defer();
		
		if(navigator.geolocation && c.liveApp) {
			navigator.geolocation.getCurrentPosition(function(location) {
				c.centerLocation.lat = location.coords.latitude;
				c.centerLocation.lng = location.coords.longitude;
				c.startLocation.lat = location.coords.latitude;
				c.startLocation.lng = location.coords.longitude;
				if(location.coords.accuracy > 14){
					c.centerLocation.zoom = Math.round(location.coords.accuracy*0.25);			
					c.startLocation.zoom = Math.round(location.coords.accuracy*0.25);
				}
				defer.resolve();
			});
		}else{
			//Default to New York
			c.centerLocation = {
				lat: 37.3382,
				lng: -121.8863,
				zoom: 9,
				icon: c.awesomeMarkerIconCurrentLocation
			};
			angular.copy(c.centerLocation,c.startLocation);
			defer.resolve();
		}
		return defer.promise;
	}
<<<<<<< HEAD

	c.mapbox = {
		mapbox_layer: {
			name: 'Mapbox',
			
=======
		
	c.mapbox = {
		mapbox_layer: {
			name: 'Mapbox',
			// url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={apikey}',
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
			url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={apikey}',
			type: 'xyz',
			options: {
				apikey: c.data.apiKey,
				mapid: 'testing'
			}
		}
	};
<<<<<<< HEAD

	c.$onInit = function() {
		$rootScope.$broadcast('refreshFooterUrl');

		c.loading = true;
		c.liveApp = false;
		c.masterMarkers = [];
		c.markers = [];	
		c.masterList = [];
		c.list = []
=======
	
	c.$onInit = function() {
		//debugger;
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
		c.searchObject = $location.search();

		c.tile = c.mapbox.mapbox_layer;	
		getDeviceLocation().then(function(){
			$timeout(function() {
				demoMarkers();
				c.loading = false;	
			}, 3000);
		});
	};
	
	$scope.$watch("c.loading", function(value) {
		if (value === false) {
			leafletData.getMap().then(function(map) {
				$timeout(function() {
					map.invalidateSize();
				}, 300);
			});
		}
	});

	function demoMarkers(){
		var list = [];
<<<<<<< HEAD
		for(var j = 0; j < c.data.list.length; j++){
=======
		for(var j = 0; j <c.data.list.length; j++){
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
			list[j] = {
				name: c.data.list[j].name,
				address: c.data.list[j].street +' ' + c.data.list[j].city +', '+ c.data.list[j].state +' '+ c.data.list[j].zip,
				types: c.data.list[j].types,
				lat: c.data.list[j].lat,
				lng: c.data.list[j].lng,
				sysId: c.data.list[j].sysId,
				location: c.data.list[j].location
			};

		}
		var markers = [];
<<<<<<< HEAD
		for(var i = 0; i < c.data.sites.length; i++){
=======
		for(var i=0;i<c.data.sites.length;i++){
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
			markers[i] = {
				name: '',
				icon: c.awesomeMarkerIconBank,
				message : '',
				image : '',
				lat: parseFloat(c.data.sites[i].lat),
				lng: parseFloat(c.data.sites[i].lng),
				getMessageScope: function(){ return $scope; }
			};
<<<<<<< HEAD
			
=======
			console.log(c.data.sites[i].location);
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
			var msg = [];
			msg.push('<div class="flex-it">');
			if(c.data.sites[i].types.indexOf('Case')>-1){
				if(c.data.sites[i].caseCount == 1){
				markers[i].name = c.data.sites[i].caseCount + ' Case';
				} else{
					markers[i].name = c.data.sites[i].caseCount + ' Cases';
				}
<<<<<<< HEAD
				
				markers[i].icon = c.awesomeMarkerIconCase;
				markers[i].type = 'Case';
				markers[i].address = c.data.sites[i].street +' ' + c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip;

=======
				//markers[i].image = 'city_financial_bank.jpg';
				markers[i].icon = c.awesomeMarkerIconCase;
				markers[i].type = 'Case';
				markers[i].address = c.data.sites[i].street +' ' + c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip;
				//msg.push('<div class="image" style="background-image:url(city_financial_bank.jpg)"></div>');
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
					msg.push('<div><div class="info-title"> # of Cases: '+ c.data.sites[i].caseCount +'</div>');
				msg.push('<div><div class="info-title"> # of my Assets: '+ c.data.sites[i].assetCount +'</div>');
				msg.push('<div class="info">'+ c.data.sites[i].street +'</div>');
				msg.push('<div class="info">'+ c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip +'</div>');
				msg.push("<div class='redirect' ng-click='c.flipFilter(" + '"'+ c.data.sites[i].location+ '"' + ',' + '"' + markers[i].type + '"' + ")'> See the list of Cases</div>");
				msg.push("<div class='redirect' ng-click='c.flipFilter(" + '"'+ c.data.sites[i].location+ '"' + ', "Asset"'+ ")'> See the list of Assets</div>");

			}else	if(c.data.sites[i].types.indexOf('Asset')>-1){
			
<<<<<<< HEAD
				
=======
				//markers[i].image = 'city_financial_atm.jpg';
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
				markers[i].icon = c.awesomeMarkerIconComputer;
				markers[i].name = c.data.sites[i].asset;
				markers[i].type = 'Asset';
				markers[i].address = c.data.sites[i].street +' ' + c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip;
<<<<<<< HEAD
=======
				//msg.push('<div class="image" style="background-image:url(city_financial_atm.jpg)"></div>');
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
				msg.push('<div><div class="info-title"> # of my Assets: '+ c.data.sites[i].assetCount +'</div>');
				msg.push('<div class="info">'+ c.data.sites[i].street +'</div>');
				msg.push('<div class="info">'+ c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip +'</div>');
				msg.push("<div class='redirect' ng-click='c.flipFilter(" + '"'+ c.data.sites[i].location+ '"' + ',' + '"' + markers[i].type + '"' + ")'> See the list of Assets</div>");
			}
			msg.push('</div>');
			markers[i].message = msg.join('');
		}
		
		markers[c.data.sites.length] = {
				name: '',
				icon: c.startLocation.icon,
				message : 'You are Here!',
				image : '',
				lat: c.startLocation.lat,
				lng: c.startLocation.lng
			};
		angular.copy(markers, c.markers);
		angular.copy(list, c.list);
		angular.copy(c.markers, c.masterMarkers);
		angular.copy(c.list, c.masterList);
	}


	function insertMarkers(markers) {
<<<<<<< HEAD

=======
		//console.log('loading');
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
		for (var i = 0; i < markers.length; i++) {
			markers[i].message = '<div class="flex-it">';
			if (markers[i].type == 'ATM') {
				markers[i].icon = c.awesomeMarkerIconComputer;
<<<<<<< HEAD
				markers[i].message = markers[i].message; 

			} else if (markers[i].type == 'Bank') {
				markers[i].name = markers[i].name + " - Branch"
				markers[i].icon = c.awesomeMarkerIconBank;
				markers[i].message = markers[i].message; 
=======
				markers[i].message = markers[i].message; //+ '<div class="image" style="background-image:url(city_financial_atm.jpg)"></div>';
				//markers[i].image = 'city_financial_atm.jpg';
			} else if (markers[i].type == 'Bank') {
				markers[i].name = markers[i].name + " - Branch"
				markers[i].icon = c.awesomeMarkerIconBank;
				markers[i].message = markers[i].message; //+ '<div class="image" style="background-image:url(city_financial_bank.jpg)"></div>';
				//markers[i].image = 'city_financial_bank.jpg';
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
			} else {
				markers[i].name = '';
				markers[i].message = markers[i].message + 'You are Here!';
				markers[i].image = '';
			}
			markers[i].message = markers[i].message + '<div><div class="info-title">'+ markers[i].name  +'</div>';
			markers[i].message = markers[i].message + '<div class="info">M-F: 9AM - 5PM</div>';
			markers[i].message = markers[i].message + '<div class="info">SAT: 9AM - 3PM</div>';
			markers[i].message = markers[i].message + '</div></div>';
		}
		return markers;
	}

	c.filterMarkers = function(type) {
		var tempArray = [];
		var listArray = [];
		if(type == 'Case and Asset'){
			for(var j = 0; j < c.masterMarkers.length; j++){
				tempArray.push(c.masterMarkers[j]);
				
			}
			for(var k = 0; k < c.masterList.length; k++){
				listArray.push(c.masterList[k]);
			}
		} else{
			for (var i = 0; i < c.masterMarkers.length; i++) {
				if (c.masterMarkers[i].type && c.masterMarkers[i].type.indexOf(type)>-1) {
					tempArray.push(c.masterMarkers[i]);
				}
			}
			for(var x = 0; x < c.masterList.length; x++){
				if(c.masterList[x].types == type){
					listArray.push(c.masterList[x]);
				}
			}
		}
		c.markers = tempArray;
		c.list = listArray;
		c.list.splice(0,0,c.startLocation);
		c.markers.splice(0, 0, c.startLocation);
	}

	c.flipIt = function(){
		// Need to force the moving of the page to the top 
		// because of scrolling on the back-part page
		$anchorScroll();
		$scope.flip();
		c.map = !c.map;
	}
	c.flipFilter = function(location, type){
		// Need to force the moving of the page to the top 
		// because of scrolling on the back-part page
<<<<<<< HEAD
		var listArray = []
		for(var i = 0; i < c.masterList.length; i++){
=======
		console.log(location);
		console.log(type);
		var listArray = []
		for(var i = 0; i < c.masterList.length; i++){
			console.log(c.masterList[i].location);
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
				if(c.masterList[i].location == location && c.masterList[i].types == type){
					listArray.push(c.masterList[i]);
				}
			}
		c.list = listArray;
		$anchorScroll();
		$scope.flip();
		c.map = !c.map;
	}
	$scope.$on('leafletDirectiveMarker.click', function(e, args) {
		var marker = args.leafletObject.getLatLng();
		c.centerLocation.lat = marker.lat + 0.002;
		c.centerLocation.lng = marker.lng;
	});
}
function MapPageController($scope, $rootScope, $window,$location, $anchorScroll, $timeout, leafletData, $q, spModal, $http) {
	/* widget controller */
	var c = this;
	$scope.firstFlip = true;
	$location.hash('ff');
	c.siteName = "";



	c.awesomeMarkerIconCurrentLocation = {
		type: 'awesomeMarker',
		icon: 'user',
		markerColor: 'green',
		prefix: 'fa',
		iconColor: '#fff'
	};
	c.awesomeMarkerIconSite = {
		type: 'awesomeMarker',
		icon: 'building',
		markerColor: 'blue',
		prefix: 'fa',
		iconColor: '#fff'
	};

	//Center of the USA
	c.centerLocation = {
		lat: parseFloat(c.options.center_latitude),
		lng: parseFloat(c.options.center_longitude),
		zoom: 12,
		icon: c.awesomeMarkerIconCurrentLocation
	}
	c.startLocation = {
		lat: parseFloat(c.options.center_latitude),
		lng: parseFloat(c.options.center_longitude),
		zoom: 12,
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
				lat: parseFloat(c.options.center_latitude),
				lng: parseFloat(c.options.center_longitude),
				zoom: 12,
				icon: c.awesomeMarkerIconCurrentLocation
			};
			angular.copy(c.centerLocation,c.startLocation);
			defer.resolve();
		}
		return defer.promise;
	}

	c.mapbox = {
		mapbox_layer: {
			name: 'Mapbox',
			
			url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={apikey}',
			type: 'xyz',
			options: {
				apikey: c.data.apiKey,
				mapid: 'testing'
			}
		}
	};
	

	c.$onInit = function() {
		$rootScope.$broadcast('refreshFooterUrl');

		c.loading = true;
		c.liveApp = false;
		c.masterMarkers = [];
		c.markers = [];	
		c.masterList = [];
		c.list = []
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
		for(var j = 0; j < c.data.list.length; j++){
			list[j] = {
				name: c.data.list[j].name,
				address: c.data.list[j].street +' ' + c.data.list[j].city +', '+ c.data.list[j].state +' '+ c.data.list[j].zip,
				types: c.data.list[j].types,
				lat: c.data.list[j].lat,
				lng: c.data.list[j].lng,
				sysId: c.data.list[j].sysId,
				attachmentSysId: c.data.list[j].attachmentSysId
			};

		}
		var markers = [];
		for(var i = 0; i < c.data.sites.length; i++){
			
			markers[i] = {
				name: '',
				icon: c.awesomeMarkerIconBank,
				message : '',
				image : '',
				title: c.data.sites[i].name,
				lat: parseFloat(c.data.sites[i].lat),
				lng: parseFloat(c.data.sites[i].lng),
				getMessageScope: function(){ return $scope; }
			};
			var msg = [];
			msg.push('<div class="flex-it">');
			if(c.data.sites[i].types.indexOf('site')>-1){
				markers[i].icon = c.awesomeMarkerIconSite;
				markers[i].type = 'site';
				markers[i].address = c.data.sites[i].street +' ' + c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip;
				markers[i].title = markers[i].address;

				msg.push('<div><div class="info-title"> '+ c.data.sites[i].name +'</div>');
				msg.push('<div class="info">'+ c.data.sites[i].street +'</div>');
				msg.push('<div class="info">'+ c.data.sites[i].city +', '+ c.data.sites[i].state +' '+ c.data.sites[i].zip +'</div>');
				msg.push('<div class="information" ng-click="information('+ "'" + c.data.sites[i].sysId + "'" + "," + "'" + c.data.sites[i].attachmentSysId + "'" + ')">Site Information</div>');
				msg.push("<a target='_blank' class='redirect' href=https://www.google.com/maps/dir/?api=1&destination=" + c.data.sites[i].lat +"," + c.data.sites[i].lng + ")>Google Maps Directions</div>");
			

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

	$scope.clearSearch = function(){
		c.search = false;
		angular.copy(c.masterList,c.list);
	}

	
	$scope.$on('leafletDirectiveMarker.click', function(e, args) {
		var marker = args.leafletObject.getLatLng();
		c.centerLocation.lat = marker.lat + 0.002;
		c.centerLocation.lng = marker.lng;
	});
	$scope.search = function (val) {

		return $http.get('/api/now/table/cmn_location?sysparm_query=name!%3DNULL%5EnameLIKE' + val + '&sysparm_limit=10',{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-UserToken': $window.g_ck
			}
		}).then(function (response) {
			return response.data.result
		});
	};
	$scope.changeLocation = function(item){
		var defer = $q.defer();
		c.centerLocation = {
			lat: parseFloat(item.lat),
			lng: parseFloat(item.lng),
			zoom: 16
		};
		angular.copy(c.centerLocation,c.startLocation);
		defer.resolve();
		return defer.promise;
	}
	$scope.sitePicked = function (item){
		var defer = $q.defer();
		c.search = true;
		c.server.get({
			sysId: item.sys_id
		}).then(function(r){

			c.latitude = r.data.locationLatitude;
			c.longitude = r.data.locationLongitude;
			c.centerLocation = {
				lat: c.latitude,
				lng: c.longitude,
				zoom: 16
			};
			angular.copy(c.centerLocation,c.startLocation);
			defer.resolve();
			c.list = []
			c.list[0] = {
				name: r.data.list[0].name,
				address: r.data.list[0].street + ' ' + r.data.list[0].city +', '+ r.data.list[0].state +' '+ r.data.list[0].zip,
				types: r.data.list[0].types,
				lat: r.data.list[0].lat,
				lng: r.data.list[0].lng,
				sysId: r.data.list[0].sysId,
				attachmentSysId: r.data.list[0].attachmentSysId
			};
			
		
		return defer.promise;
		});
	
	}
	$scope.information = function(sysId, attachmentSysId){

		spModal.open({
			widget:'site_information',
			widgetInput:{sysId:sysId, attachmentSysId:attachmentSysId},
			size:'md'
		})
	};
}
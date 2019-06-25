function($scope, $http, $window) {
  /* widget controller */
  var c = this;
	
	// Color the status bar based on the status of the project
	if(c.data.proj.status == 'Green'){
		c.statusBar = {
			'background-color' : '#71E279'
		} 
	} else if (c.data.proj.status == 'Red'){
		c.statusBar = {
			'background-color' : '#F95050'
		} 
	} else {
		c.statusBar = {
			'background-color' : '#FCC742'
		}
	}

	var liveProfiles = {};
	liveProfiles[$scope.user.sys_id] = {
		userID: $scope.user.sys_id,
		name: $scope.user.name,
		initials: $window.NOW.user_initials
	};
	if ($window.NOW.user_avatar) {
		liveProfiles[$scope.user.sys_id].userImage = $window.NOW.user_avatar;
	}

	$scope.getLiveProfileByUserId = function (userId){
		return liveProfiles[userId];
	}
	
	var pending = {};

	//Little caching implementation to make sure we only get a given user's profile once.
	$scope.hasLiveProfile = function hasLiveProfile(userId){
		if (!userId)
			return false;

		if (liveProfiles[userId])
			return true;
		
		if (pending[userId])
			return false;
		
		pending[userId] = $http.get('/api/now/live/profiles/sys_user.' + userId).then(function (response) {
			liveProfiles[userId] = {
				userID: userId,
				name: response.data.result.name,
				initials: buildInitials(response.data.result.name),
				avatar: response.data.result.avatar
			};
		});
		return false;
	}

	function buildInitials(name) {
		if (!name)
			return "--";

		var initials = name.split(" ").map(function(word) {
			return word.toUpperCase();
		}).filter(function(word) {
			return word.match(/^[A-Z]/);
		}).map(function(word) {
			return word.substring(0,1);
		}).join("");

		return (initials.length > 3) ? initials.substr(0, 3) : initials;
	}

}

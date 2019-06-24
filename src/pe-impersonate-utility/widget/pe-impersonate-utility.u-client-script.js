function ImpersonateUtilityController($window) {
  /* widget controller */
  var c = this;

	c.impersonate = function(name){
		c.server.get({ "name": name }).then(function(r) {
            if(r.data.old_user){
				$window.location.reload();
			}
		});
	};
}
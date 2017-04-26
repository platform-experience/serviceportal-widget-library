(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.incident = options.incident || serverOptions.incident || 'd71f7935c0a8016700802b64c67c11c6';
  options.titleIconClasses = options.titleIconClasses || serverOptions.titleIconClasses || 'fa fa-bolt';

  var fakeRevenue = ['1.2M', '0.9M', '0.3M', '112K', '78K'];

  if (options.incident){
		var incidentGR = new GlideRecord('incident');
		if (incidentGR.get(options.incident)) {
			var inc = {};
      inc.short_description = incidentGR.short_description.toString();
      inc.number = incidentGR.number.toString();
      inc.opened_at = incidentGR.opened_at.toString();
      inc.closed_at = incidentGR.closed_at.toString();
      inc.resolved_at = incidentGR.resolved_at.toString();
      inc.all_users = [];
      inc.all_revenue = fakeRevenue[0];

      var stateValue = incidentGR.state.toString();
      var state = new GlideRecord('sys_choice');
      state.addQuery('element','state');
      state.addQuery('name','incident');
      state.addQuery('value', stateValue );
      state.query();
      while(state.next()){
      	inc.state = {
	      	value: stateValue,
	      	label: state.label.toString()
	      };
      };

      var userGroupMembers = [];
      var groupMember = new GlideRecord('sys_user_grmember');
      groupMember.addQuery('group.sys_id', incidentGR.business_service.user_group.toString());
      groupMember.query();
      while(groupMember.next()){
        var userID = groupMember.user.sys_id.toString();
        userGroupMembers.push( userID );
      }
    	inc.business_services = [{
    		sys_id: incidentGR.business_service.toString(),
    		name: incidentGR.business_service.name.toString(),
        location: incidentGR.business_service.location.toString(),
        user_group: incidentGR.business_service.user_group.toString(),
        users: userGroupMembers,
        revenue: fakeRevenue[1]
    	}];
      userGroupMembers.forEach( function(user){
        if (inc.all_users.indexOf(user) === -1){
          inc.all_users.push(user);
        }
      });
      var rel = GlideRecord('cmdb_rel_type');
      rel.addQuery('name', 'Depends on::Used by');
      rel.query();
      rel.next();
      var service_dependency = new GlideRecord('cmdb_rel_ci');
      service_dependency.addQuery('type.sys_id', rel.sys_id.toString() );
      service_dependency.addQuery('child.sys_id', incidentGR.business_service.toString() );
      service_dependency.query();
      while ( service_dependency.next() ) {
        // make this DRY!
        var userGroupMembers = [];
        var groupMember = new GlideRecord('sys_user_grmember');
        groupMember.addQuery('group.sys_id', service_dependency.parent.user_group.toString());
        groupMember.query();
        while(groupMember.next()){
          userGroupMembers.push( groupMember.user.sys_id.toString() );
        }
        inc.business_services.push({
          sys_id: service_dependency.parent.sys_id.toString(),
          name: service_dependency.parent.name.toString(),
          location: service_dependency.parent.location.toString(),
          user_group: service_dependency.parent.user_group.toString(),
          users: userGroupMembers,
          revenue: fakeRevenue[2]
        });
        userGroupMembers.forEach( function(user){
          if (inc.all_users.indexOf(user) === -1){
            inc.all_users.push(user);
          }
        });
      }
      data.incident = inc;

      data.drawerWidget = $sp.getWidget('pe-business-impact-details', {
        incident: data.incident
      });

		}
	}

})();
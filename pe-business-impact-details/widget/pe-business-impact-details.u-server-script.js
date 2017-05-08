(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.alert = options.alert || serverOptions.alert;

  var fakeRevenue = ['1.2M', '0.9M', '0.3M', '89K', '78K'];
  
  var summaryStats = {
    users: [],
    revenue: fakeRevenue[0]
  };

  var REL_ID = (function(){
    var rel = new GlideRecord('cmdb_rel_type');
    rel.addQuery('name', 'Depends on::Used by');
    rel.query();
    rel.next();
    return rel.sys_id.toString();
  })();

  var getUsers = function( userGroupID ){
    var users = [];
    var groupMember = new GlideRecord('sys_user_grmember');
    groupMember.addQuery('group', userGroupID);
    groupMember.query();
    while (groupMember.next()) {
      var userID = groupMember.user.sys_id.toString();
      users.push( userID );
      if (summaryStats.users.indexOf(userID) === -1) summaryStats.users.push(userID);
    }
    return users;
  };

  var getDependentCIs = function(gr, arr){
  	var userGroupID = gr.user_group.toString();
    var userGroup = userGroupID.length ? getUsers( userGroupID ) : [];
    arr.push({
      sys_id: gr.sys_id.toString(),
      name: gr.name.toString(),
      location: gr.location.toString(),
      classification: gr.service_classification.toString(),
      users: userGroup,
      revenue: fakeRevenue[Math.floor(Math.random()*5)]
    });
    var ciGR = new GlideRecord('cmdb_rel_ci');
    ciGR.addQuery('type.sys_id', REL_ID );
    ciGR.addQuery('child.sys_id', gr.sys_id.toString() );
    ciGR.query();
    while ( ciGR.next() ) {
      var parentGR = new GlideRecord('cmdb_ci_service');
      parentGR.get( ciGR.parent.toString() );
      var dependentsArray = getDependentCIs(parentGR, []);
      dependentsArray.forEach(function(ci){
        arr.push(ci);
      });
    }
    return arr;
  };

  var getAlert = function(gr){
    var CIs = [];
    var ciGR = new GlideRecord('cmdb_ci_service');
    if ( ciGR.get( gr.cmdb_ci.toString() ) ) {
      CIs = getDependentCIs(ciGR, CIs);
    }
    return {
      sys_id: gr.sys_id.toString(),
      type: gr.type.getDisplayValue(),
      description: gr.description.toString(),
      incident: gr.incident.sys_id.toString(),
      state: gr.state.toString(),
      cis: CIs
    };
  };

  var alertGR, alert;
  if (options.alert) {
    alertGR = new GlideRecord('em_alert_anomaly');
    alertGR.get(options.alert);
    alert = getAlert( alertGR );
  } else {
    alertGR = new GlideRecord('em_alert_anomaly');
    // alertGR.addEncodedQuery('state!=Closed');
    alertGR.orderByDesc('sys_created_on');
    alertGR.query();
    alertGR.next();
    alert = getAlert( alertGR );
  }
  alert.summaryStats = summaryStats;
  data.alert = alert;

})();
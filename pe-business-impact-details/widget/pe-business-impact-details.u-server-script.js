(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.alert_sysid = options.alert_sysid || serverOptions.alert_sysid;

	var fakeRevenue = [1.2, 0.9, 0.3, 0.89, 0.78];
  var totalFakeRevenue = 0.0;
  var summaryStats = {
    users: 0.0,
    revenue: 0.0
  };

  var REL_ID = (function(){
    var rel = new GlideRecord('cmdb_rel_type');
    rel.addQuery('name', 'Depends on::Used by');
    rel.query();
    rel.next();
    return rel.sys_id.toString();
  })();

  var getDependentCIs = function(rec, arr){

		//Fake Users and Revenue
		var fakeUsers = (Math.floor(Math.random()*40)+1);
		var fakeRev = fakeRevenue[Math.floor(Math.random()*5)];
		summaryStats.revenue += fakeRev;
		summaryStats.users += fakeUsers;

		
		arr.push({
      sys_id: rec.sys_id.toString(),
      name: rec.name.toString(),
      location: rec.location.toString(),
      classification: rec.service_classification.toString(),
      users: fakeUsers.toString() + 'K',
      revenue: fakeRev.toString() +'M'
    });
		
    var ciGR = new GlideRecord('cmdb_rel_ci');
    ciGR.addQuery('type.sys_id', REL_ID );
    ciGR.addQuery('child.sys_id', rec.sys_id.toString() );
    ciGR.query();
		
    while ( ciGR.next() ) {
      var parentGR = new GlideRecord('cmdb_ci_service');
			data.userGroups.push(ciGR.parent.toDisplayValue());
      parentGR.get( ciGR.parent.toString() );
      var dependentsArray = getDependentCIs(parentGR, []);
      dependentsArray.forEach(function(ci){
        arr.push(ci); 
			});
    }
    return arr;
  };

  var getAlert = function(rec){
    var CIs = [];
    var ciGR = new GlideRecord('cmdb_ci');
		data.ciGRGet = rec.cmdb_ci.toString();
    if ( ciGR.get( rec.cmdb_ci.toString() ) ) {
      CIs = getDependentCIs(ciGR, CIs);
    }
    return {
      sys_id: rec.sys_id.toString(),
      type: rec.type.getDisplayValue(),
      description: rec.description.toString(),
      incident: rec.incident.sys_id.toString(),
      state: rec.state.toString(),
      cis: CIs
    };
  };
	
  var alertGR, alert;
	//Passed in from the Business Impact widget
	if(options.alert){
		data.alert = options.alert;		
	}else{
		if (options.alert_sysid) {
			alertGR = new GlideRecord('em_alert_anomaly');
			alertGR.get(options.alert_sysid);
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
		alert.summaryStats.users = alert.summaryStats.users.toFixed(0);
		alert.summaryStats.revenue = alert.summaryStats.revenue.toFixed(1);
		data.alert = alert;
	}
  
})();
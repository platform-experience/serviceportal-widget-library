(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	data.major_inc = [];
	data.service = [];

	var inc = new GlideRecord('incident');
	inc.addQuery('major_incident_state', 'accepted'); // pull all major incidents
	inc.addActiveQuery();
	inc.query();

	while(inc.next()){
		data.major_inc.push({
			sys_id: inc.getUniqueValue(),
			number: inc.getValue('number'),
			short_desc: inc.getValue('short_description'),
			desc: inc.getValue('description'),
			ci: inc.getValue('cmdb_ci'),
			created: formatDate(inc.getDisplayValue('sys_created_on')),
			priority: inc.getDisplayValue('priority'),
			category: inc.getDisplayValue('category'),
			assign_group: inc.getDisplayValue('assignment_group'),
			assign_to: inc.getDisplayValue('assigned_to'),
			duration: getDur(inc.getValue('calendar_duration')),
			findings: inc.getValue('lessons_learned'),
			service: getServices(inc.getUniqueValue()),
			outage: getOutages(inc.getUniqueValue()),
			location: getLocations(inc.getUniqueValue())
		})
	}

	// Sort array by number 
	data.major_inc.sort(function(a, b) {
		if (a.number < b.number) return -1;
		if (a.number > b.number) return 1;
		return 0;
	});

	data.major_inc.reverse(); // Newest to oldest

	function getServices(task){
		var arr = [];

		var serv = new GlideRecord('task_cmdb_ci_service');
		serv.addQuery('task', task);
		serv.query();

		while(serv.next()){
			arr.push({
				sys_id: serv.getUniqueValue(),
				service: serv.getDisplayValue('cmdb_ci_service'),
				owner: getOwner(serv.getValue('cmdb_ci_service'))
			})
		}
		
		return arr;
	}

	function getOwner(service){
		var servRec = new GlideRecord('cmdb_ci');
		servRec.get('sys_id', service);

		return servRec.getDisplayValue('owned_by');
	}

	function getOutages(task){
		var arr = [];

		var out = new GlideRecord('task_outage');
		out.addQuery('task', task);
		out.query();

		while(out.next()){
			arr.push({
				sys_id: out.getUniqueValue(),
				outage: out.getDisplayValue('outage'),
				ci: getDetails(out.getValue('outage'), 'ci'),
				type: getDetails(out.getValue('outage'), 'type'),
				begin: getDetails(out.getValue('outage'), 'begin'),
				end: getDetails(out.getValue('outage'), 'end')
			})
		}

		function getDetails(outage, field){
			var outRec = new GlideRecord('cmdb_ci_outage');
			outRec.get('sys_id', outage);

			if(field == 'type'){
				return outRec.getDisplayValue('type');
			} else if(field == 'begin'){
				return outRec.getDisplayValue('begin');
			} else if(field == 'ci'){
				return outRec.getDisplayValue('cmdb_ci');
			} else {
				return outRec.getDisplayValue('end');
			}
		}

		return arr;
	}

	function getLocations(task){
		var arr = [];

		var serv = new GlideRecord('task_cmdb_ci_service');
		serv.addQuery('task', task);
		serv.query();

		while(serv.next()){	
			if(getDetails(serv.getValue('cmdb_ci_service'), 'name')){
				arr.push({
					sys_id: serv.getUniqueValue(),
					service: serv.getDisplayValue('cmdb_ci_service'),
					name: getDetails(serv.getValue('cmdb_ci_service'), 'name'),
					city: getDetails(serv.getValue('cmdb_ci_service'), 'city'),
					country: getDetails(serv.getValue('cmdb_ci_service'), 'country')
				})
			}
		}

		function getDetails(service, field){
			var servRec = new GlideRecord('cmdb_ci');
			servRec.get('sys_id', service);

			if(field == 'name'){
				return servRec.getDisplayValue('location');
			} else if (field == 'city'){
				return getLocationInfo(servRec.getValue('location'), 'city');
			} else {
				return getLocationInfo(servRec.getValue('location'), 'country');
			}

			function getLocationInfo(location, field){
				if(location){
					var loc = new GlideRecord('cmn_location');
					loc.get('sys_id', location);

					if(field == 'city'){
						return loc.getDisplayValue('city') || '     ';
					} else {
						return loc.getDisplayValue('country') || '     ';
					}
				} else return '';	
			}
		}

		return arr;
	}

	// Return a duration in hh:mm:ss format
	function getDur(dateTime){
		if(dateTime){
			var dur = new GlideDuration();
			dur.setValue(dateTime);
			var durTime = dur.getByFormat('HH:mm:ss');

			return durTime;
		} else return '00:00:00';
	}

	// Return a formatted date/time ex. Dec-11-19 12:00AM
	function formatDate(dateTime){
		var gdt = new GlideDateTime(dateTime);
		var date = gdt.getDate();
		var fd = date.getByFormat('MMM-dd-yy h:mma');

		return fd;
	}

})();
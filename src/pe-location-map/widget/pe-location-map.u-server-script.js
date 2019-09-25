(function() {
	options.central_latitude = options.central_latitude || 37.7749;
	options.central_longitude = options.central_longitude || -122.4194;
	data.apiKey = options.mapbox_apikey;
	var currentUser = gs.getUserID();
	data.instanceURL = gs.getProperty('glide.servlet.uri');

	data.sites = [];
	data.list = [];
	var grSites = new GlideRecord('cmn_location');
	latLonQuery = 'latitudeISNOTEMPTY^longitudeISNOTEMPTY';
	grSites.addEncodedQuery(latLonQuery);
	grSites.query();


	while (grSites.next()) {

		attachmentSysId = ''
		var attachment = new GlideRecord('sys_attachment');
		attachment.addQuery('table_sys_id', grSites.sys_id);
		attachment.query()
		if(attachment.next()){
			attachmentSysId = attachment.sys_id.getDisplayValue();
		}
		data.sites.push({
			sysId: grSites.sys_id.getDisplayValue(),
			name: grSites.getDisplayValue(),
			street : grSites.street.getDisplayValue(),
			city : grSites.city.getDisplayValue(),
			state : grSites.state.getDisplayValue(),
			zip : grSites.zip.getDisplayValue(),
			lat : grSites.latitude.getDisplayValue(),
			lng : grSites.longitude.getDisplayValue(),
			attachmentSysId: attachmentSysId,
			types: 'site'
		});
		data.list.push({
			sysId: grSites.sys_id.getDisplayValue(),
			name: grSites.getDisplayValue(),
			street : grSites.street.getDisplayValue(),
			city : grSites.city.getDisplayValue(),
			state : grSites.state.getDisplayValue(),
			zip : grSites.zip.getDisplayValue(),
			lat : grSites.latitude.getDisplayValue(),
			lng : grSites.longitude.getDisplayValue(),
			attachmentSysId: attachmentSysId,
			types: 'site'
		});

	}
	if(input && input.sysId){
		data.list = [];

		var sites = new GlideRecord('cmn_location');
		sites.get(input.sysId);
		
		data.locationLatitude = parseFloat(sites.latitude.getDisplayValue());
		data.locationLongitude = parseFloat(sites.longitude.getDisplayValue());
		var filteredAttachment = new GlideRecord('sys_attachment');
		filteredAttachment.addQuery('table_sys_id', grSites.sys_id);
		filteredAttachment.query()
		if(filteredAttachment.next()){
			attachmentSysId = filteredAttachment.sys_id.getDisplayValue();
		}
		data.list.push({
			sysId: sites.sys_id.getDisplayValue(),
			name: sites.getDisplayValue(),
			location: sites.getDisplayValue(),
			street : sites.street.getDisplayValue(),
			city : sites.city.getDisplayValue(),
			state : sites.state.getDisplayValue(),
			zip : sites.zip.getDisplayValue(),
			lat : sites.latitude.getDisplayValue(),
			lng : sites.longitude.getDisplayValue(),
			attachmentSysId: attachmentSysId,
			types: 'site'
		});

	}

	
})();
(function() {
<<<<<<< HEAD

	data.apiKey = options.mapbox_apikey;
=======
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	data.apiKey = 'pk.eyJ1Ijoic3VzaC1jaGFuZHJhc2hla2FyIiwiYSI6ImNqMnFwcnplZTAwMDEycWt6cm1yNDF0bzEifQ.krI_R9WCDI_GBKrfY6bf1g';//gs.getProperty('x_snc_guide.mapbox.apikey');
>>>>>>> 6e89d1966f9d390bbf8c0d9f0b7eaa97d292bf42
	var currentUser = gs.getUserID();

	var userAccount = '';
	var user = new GlideRecord('customer_contact');
	user.addQuery('sys_id', currentUser);
	user.query();
	if(user.next()){
		userAccount = user.account;
	}
	data.sites = [];
	var locations = [];
	data.list = [];
	var grSites = new GlideRecord('sn_customerservice_case');
	latLonQuery = 'asset.locationISNOTEMPTY^assetISNOTEMPTY^contact=' + currentUser;//'locationISNOTEMPTY^location.latitudeISNOTEMPTY^location.longitudeISNOTEMPTY';
	grSites.addEncodedQuery(latLonQuery);
	grSites.query();
	while (grSites.next()) {
		var locationExists = locations.indexOf(grSites.asset.location.getDisplayValue())
		data.list.push({
				sysId: grSites.sys_id.getDisplayValue(),
				name: grSites.getDisplayValue(),
				location: grSites.asset.location.getDisplayValue(),
				street : grSites.asset.location.street.getDisplayValue(),
				city : grSites.asset.location.city.getDisplayValue(),
				state : grSites.asset.location.state.getDisplayValue(),
				zip : grSites.asset.location.zip.getDisplayValue(),
				lat : grSites.asset.location.latitude.getDisplayValue(),
				lng : grSites.asset.location.longitude.getDisplayValue(),
				types: 'Case'
			});
		if(locationExists == -1){
			locations.push(grSites.asset.location.getDisplayValue());			
			data.sites.push({
				asset: grSites.asset.getDisplayValue(),
				location: grSites.asset.location.getDisplayValue(),
				sys_id : grSites.asset.location.sys_id,
				street : grSites.asset.location.street.getDisplayValue(),
				city : grSites.asset.location.city.getDisplayValue(),
				state : grSites.asset.location.state.getDisplayValue(),
				zip : grSites.asset.location.zip.getDisplayValue(),
				phone : grSites.asset.location.phone.getDisplayValue(),
				lat : grSites.asset.location.latitude.getDisplayValue(),
				lng : grSites.asset.location.longitude.getDisplayValue(),
				types : 'Case',
				caseCount : 1,
				assetCount : 0
			});
		} else{
			data.sites[locationExists].caseCount++;
		}
	}
	
	var grAssets = new GlideRecord('alm_asset');
	latLonQuery = 'locationISNOTEMPTY^account=' + userAccount;
	grAssets.addEncodedQuery(latLonQuery);
	grAssets.query();
	while (grAssets.next()) {
		data.list.push({
				name: grAssets.getDisplayValue(),
			location: grAssets.location.getDisplayValue(),
				street : grAssets.location.street.getDisplayValue(),
				city : grAssets.location.city.getDisplayValue(),
				state : grAssets.location.state.getDisplayValue(),
				zip : grAssets.location.zip.getDisplayValue(),
				lat : grAssets.location.latitude.getDisplayValue(),
				lng : grAssets.location.longitude.getDisplayValue(),
				types: 'Asset'
			
			});
		var assetLocationExists = locations.indexOf(grAssets.location.getDisplayValue())
		if(assetLocationExists == -1){
			locations.push(grSites.asset.location.getDisplayValue());
			data.sites.push({
				asset: grAssets.getDisplayValue(),
				sys_id : grAssets.location.sys_id,
				location: grAssets.location.getDisplayValue(),
				street : grAssets.location.street.getDisplayValue(),
				city : grAssets.location.city.getDisplayValue(),
				state : grAssets.location.state.getDisplayValue(),
				zip : grAssets.location.zip.getDisplayValue(),
				phone : grAssets.location.phone.getDisplayValue(),
				lat : grAssets.location.latitude.getDisplayValue(),
				lng : grAssets.location.longitude.getDisplayValue(),
				types : 'Asset',
				assetCount : 1
			});
		} else{
			data.sites[assetLocationExists].assetCount++;
		}
	}
	
})();
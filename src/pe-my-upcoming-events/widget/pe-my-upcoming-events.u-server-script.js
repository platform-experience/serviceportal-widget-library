(function() {

	data.user = gs.getUserID();
	var myRsvp = new GlideRecord('sn_communities_event_rsvp');
	
	myRsvp.query();
	data.listItems =[];

var test = "start_date>=javascript:gs.beginningOfToday()";
	while (myRsvp.next()) {
		if (data.user == myRsvp.attendee.document)
		{
			var eventSysId = myRsvp.event;
			var event = new GlideRecord('sn_communities_event');
		  event.addQuery('sys_id', eventSysId);
			event.addEncodedQuery(test);
			event.query();
			while (event.next()) {
				var gd = new GlideDate();
				gd.setValue(event.start_date.getDisplayValue());
				var month = gd.getByFormat("MMMMM");
				var day = gd.getByFormat("dd");
				data.listItems.push({
					title: event.title.getDisplayValue(),
					month: month,
					day: day,
					location: event.location.getDisplayValue(),
					rsvp_status: myRsvp.rsvp_status.getDisplayValue(),
					sys_id: eventSysId.sys_id.getDisplayValue()
				})
			}
		}
	}
})();


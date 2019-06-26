function LEProgressTrackerController(spUtil) {
  /* widget controller */
  var c = this;

  if (!c.data.events || c.data.events.length <= 0) {
    c.no_data = true;

    if (c.data.errorLink) {
      spUtil.addInfoMessage('<h3><span class="fa fa-exclamation-triangle m-r-xs"></span> <strong>${Action}: </strong><a href="' + c.data.errorLink + '" target="_blank">${Allow Restricted Caller Access Link}</a></h3>');
    }
    return;
  }

  c.selectedEvent = c.data.events[0];	
  c.select = function(event) {
    c.selectedEvent = event;
  };
}
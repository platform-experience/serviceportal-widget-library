function SPServiceOutageCardController($location, spModal, $rootScope) {
  /* widget controller */
  var c = this;

  c.isResolved = function (outage) {
    if (outage.outage_detail && outage.outage_detail.state &&
      (outage.outage_detail.state.toLowerCase() == 'resolved' || outage.outage_detail.state.toLowerCase() == 'closed'))
      return true;
    return false;
  };

  c.getColor = function (outage) {
    var color = 'danger';
    if (c.isResolved(outage))
      color = 'success';
    return color;
  };

  c.getTaskColor = function (task) {
    var color = 'danger';
    if (task.state == 'Resolved' || task.state == 'Closed')
      color = 'success';
    return color;
  };

  c.current = '';
  c.currentColor = 'default';
  c.currentIndex = 0;
  if (c.data.outages.length > 0) {
    c.current = c.data.outages[0].sys_id;
    c.currentColor = c.getColor(c.data.outages[0]);
  }

  c.createIncident = function (outage) {
    c.server.get({
      action: 'create',
      sys_id: c.data.sys_id,
      outage_sys_id: outage.sys_id
    }).then(function (response) {
      c.data = response.data;
    });
  };

  c.prev = function () {
    c.currentIndex--;
    c.current = c.data.outages[c.currentIndex].sys_id;
    c.currentColor = c.getColor(c.data.outages[c.currentIndex]);
  };

  c.next = function () {
    c.currentIndex++;
    c.current = c.data.outages[c.currentIndex].sys_id;
    c.currentColor = c.getColor(c.data.outages[c.currentIndex]);
  };

  c.goToPage = function (params) {
    $location.search(params);
  };

  c.openTask = function (params) {
    spModal.open({
      title: '${You are viewing }' + ' ' + params.number,
      widget: 'widget-form',
      buttons: [{
        label: '${Close}',
        cancel: true
      }],
      footerStyle: {
        'display': 'none'
      },
      size: 'lg',
      widgetInput: {
        table: params.table,
        sys_id: params.sys_id,
        view: 'sp'
      }
    });
  };

  $rootScope.$on('spModel.gForm.initialized', function (event, gFormInstance) {
    c.cssModal();
    if (gFormInstance.getUniqueValue() == c.data.sys_id) {
      var fields = gFormInstance.getFieldNames();
      for (var i = 0; i < fields.length; i++)
        gFormInstance.setReadOnly(fields[i], true);
    }
  });

}

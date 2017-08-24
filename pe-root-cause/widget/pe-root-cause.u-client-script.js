function RootCauseController() {
  var c = this;
  c.alert = c.data.alert;
  c.drawerWidget = c.data.drawerWidget;

  c.stats = [{
    name: c.alert.ci.name,
    icon: '#server'
  },
  {
    name: c.alert.type,
    icon: '#computer-ram'
  },
  {
    name: 'Cause',
    icon: '#calendar',
    detail: c.alert.incident.cause.number || 'unknown'
  }];
}
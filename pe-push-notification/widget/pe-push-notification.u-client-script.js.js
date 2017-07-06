function PushNotificationsController($window, $scope) {
  /* widget controller */
  var c = this;
  var d1 = new Date();
  var d = new Date();
	
  c.show = false;
  if ($scope.$root.portal)
    c.show = true;
  if (!c.data.notification.date) {
    d1 = new Date();
    d = new Date();
    d.setUTCFullYear(d1.getFullYear());
    d.setUTCMonth(d1.getMonth());
    d.setUTCDate(d1.getDate());
    c.data.notification.date = d.toLocaleDateString($window.navigator.language, {
      weekday: 'long',
      month: 'long',
      year: '2-digit'
    });
  }
  if (!c.data.notification.time) {
    d1 = new Date();
    d = new Date();
    d.setUTCHours(d1.getHours());
    d.setUTCMinutes(d1.getMinutes());
    c.data.notification.time = d.toLocaleTimeString($window.navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  console.log('c.data.background_image = ' + c.data.notification.background_image);
  if (c.data.notification.background_image) {
    if (c.data.notification.background_image.length > 0)
      document.getElementById('main-container').style.backgroundImage = "url(" + c.data.notification.background_image + ")";
  }
}
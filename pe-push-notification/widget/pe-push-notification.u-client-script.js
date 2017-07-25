function PushNotificationsController($window, $scope) {
  /* widget controller */
  var c = this;
  var d1 = new Date();
  var d = new Date();

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.iOS());
    }
  };

  c.show = false;
  if ($scope.$root.portal && (isMobile.iOS() || isMobile.Android()))
    c.show = true;

  if (c.show) {

    if (!c.data.notification.date) {
      d1 = new Date();
      d = new Date();
      d.setUTCFullYear(d1.getFullYear());
      d.setUTCMonth(d1.getMonth());
      d.setUTCDate(d1.getDate());
      c.data.notification.date = d.toLocaleDateString($window.navigator.language, {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
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

    if (c.data.notification.background_image) {
      if (c.data.notification.background_image.length > 0)
        document.getElementById('main-container').style.backgroundImage = "url(" + c.data.notification.background_image + ")";
    }
  }

  c.goToPage = function () {
    $window.location.href = c.data.notification.page;
  };

}
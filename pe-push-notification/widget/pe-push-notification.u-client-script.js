function PushNotificationsController($window, $scope) {
  /* widget controller */
  var c = this;

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
    c.current_date = new Date().toISOString();

    if (!c.data.notification.date)
      c.data.notification.date = c.current_date;

    if (!c.data.notification.time) {
      c.data.notification.time = c.current_date;
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
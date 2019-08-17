function homepageSearchWithVideoController($timeout, $window) {
  var c = this;
  c.$onInit = function () {
    c.videoStartat = c.data.video.videoStartat || 0;
    c.videoJson = "{videoURL:'" + c.data.video.youtbeUrl + "',containment:'.video-section', quality:'" + c.data.video.quality + "', mobileFallbackImage:'" + c.data.video.mobilefallBackImage + "', startAt:" + c.videoStartat + ", stopAt:" + c.data.video.videoStopat + ", align:'" + c.data.video.alignment + "'}";
    initilizePlayer();
  };

  function initilizePlayer() {
    $timeout(function () {
      $(function () {
        $("#bgndVideo").mb_YTPlayer();
        $window.YTConfig = {
          host: 'https://www.youtube.com'
        };
      });
    }, 50);
  }

}
function CarouselPlusController($sce) {
  var c = this;
  c.secureUrl = secureUrl;
  c.stopVideo = stopVideo;

  function secureUrl(id) {
    var videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + id);
    return videoUrl;
  }

  function stopVideo() {
    var el = angular.element('.youtube');
    c.data.slides.map(function(slide, index) {
      if (el[index]) {
        el[index].src = el[index].src;
      }
    });
  }
}

function NewsCarouselCtrl($timeout) {
  /* widget controller */
  var c = this;
  c.selectItem = selectItem;

  c.$onInit = function () {
    c.selectedItem = 0;
    $('#myCarousel').on('slide.bs.carousel', function (e) {
      var next = $(e.relatedTarget);
      var to = next.index();
      $timeout(function () {
        c.selectedItem = to;
      }, 0)
    });

  };

  function selectItem(index) {
    $('#myCarousel').carousel(index)
  }
}
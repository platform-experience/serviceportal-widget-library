function SearchCTACtrl($scope, spUtil) {
  /* widget controller */
  var c = this;
  c.$onInit = function () {
    c.interval = c.options.interval * 1000;
    c.slides = c.data.slides.map(function (item) {
      return item.image;
    });

    if (c.options.embed_widget) {
      spUtil.get(c.options.embed_widget, {}).then(function (response) {
        c.widgetToInclude = response;
      });
    }
  }
}
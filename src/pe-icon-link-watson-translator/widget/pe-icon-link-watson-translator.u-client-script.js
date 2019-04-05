function ImageLinkTranslatorController() {
  var c = this;

  c.$onInit = function() {
    c.title = c.data.title;
    c.short_description = c.data.short_description;
  };
}

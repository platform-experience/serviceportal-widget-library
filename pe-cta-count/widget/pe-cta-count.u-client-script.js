function CTACountCtrl() {
  /* widget controller */
  var c = this;
  c.$onInit = function () {
      c.customStyle = {
          "background-image": 'url(' + c.options.image + ')'
      }
  };
}

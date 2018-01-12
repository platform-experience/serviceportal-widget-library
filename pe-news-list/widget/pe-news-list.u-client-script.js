function NewsListCtrl() {
  /* widget controller */
  var c = this;
  c.$onInit = function () {
    console.log(c);
    console.log(c.data.items);
  };
}
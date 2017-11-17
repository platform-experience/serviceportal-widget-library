function BlogController() {
  var c = this;

  c.$onInit = function() {
    c.dateFormat = 'MMMM d, y';
    c.defaultAuthor = 'Unknown';
  };
}

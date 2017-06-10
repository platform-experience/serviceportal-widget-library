function HorizontalStackedBarController() {
  var c = this;
  c.getPercent = getPercent;

  function getPercent(remaining, total) {
    var percent = (total - remaining) / total * 100;
    return {
      'width': percent + '%'
    };
  }
}
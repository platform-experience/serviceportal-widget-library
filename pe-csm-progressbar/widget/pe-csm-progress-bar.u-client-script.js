function ProgressBarController() {
  var c = this;
  c.getStyle = getStyle;

  function getStyle(total, actual, bgcolor) {
    return {
      'width': (actual / total * 100) + '%',
      'background-color': bgcolor
    };
  }
}
function HorizontalStakedBar() {
  /* widget controller */
  var c = this;

  c.getPercent = function (remaining, total) {
    //debugger;
    var percent = (total - remaining) / total * 100;
    return {
      'width': percent + '%'
    };
  };

}
function NewHireOrientationController() {
  var c = this;

  c.$onInit = function() {
    c.data.startMonth = moment(c.data.data).format('MMM');
    c.data.startDay = moment(c.data.date);
    c.orientation = c.data.startDay.format('MMM DD, YYYY');
  };
}

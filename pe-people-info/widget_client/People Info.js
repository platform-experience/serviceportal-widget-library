function PeopleInfoController($window) {
  var c = this;
  c.call = call;

  function call(telNumber) {
    if (telNumber) {
      $window.location.href = 'tel://' + telNumber;
    }
  }
}
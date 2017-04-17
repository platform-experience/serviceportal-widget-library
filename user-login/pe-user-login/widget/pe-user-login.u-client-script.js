function UserLoginController($rootScope) {
  var c = this;
  c.goHome = goHome;

  function goHome() {
    $rootScope.loginState = 2;
  }
}
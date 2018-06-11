function HRServiceController($rootScope, $scope) {
  var c = this;
  c.changedBankingInfo = changedBankingInfo;

  c.$onInit = function() {
    $rootScope.wrapper.actionLabel = 'Submit';
    $rootScope.wrapper.action = onSubmit;
  };

  function changedBankingInfo() {
    $rootScope.wrapper.actionEnabled = c.routingNumber && c.accountNumber;
  }

  function onSubmit() {
    $scope.$emit('next-task', { changeState: true });
  }
}

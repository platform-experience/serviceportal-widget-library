function CasesCardController() {
  var c = this;

  $scope.getColor = function (state) {
    switch (state) {
      case 'New':
        return 'gray';
      case 'Open':
        return 'gray';
      case 'Awaiting Info':
        return 'blue';

      case 'Resolved':
        return 'green';

      case 'Closed':
        return 'green';

      case 'Cancelled':
        return 'red';

    }
  }

  $scope.currentPage = 0;
  $scope.pageSize = 12;
  $scope.startFrom = function () {
    return c.data.listItem.slice($scope.currentPage * $scope.pageSize);
  }

  $scope.goLink = function () {
    $window.location.href = 'replace-your-url-page-here';
  }

}

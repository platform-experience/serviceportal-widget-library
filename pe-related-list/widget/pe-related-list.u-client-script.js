function RelatedListController($rootScope, $location) {
  var c = this;
  c.$onInit = function () {
      console.log(c);
      addListenerToListClick()
  };

  function addListenerToListClick() {
      $rootScope.$on('data_table.click', function (event, obj) {
          var link = $location.search();
          link.sys_id = obj.sys_id;
          link.table = obj.table;
          $location.search(link);
      })
  }
}

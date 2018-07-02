function TaskSubmitOrderGuideController($http, $q, $rootScope, $scope) {
  var c = this;
  c.titleClicked = titleClicked;
  c.selectItem = selectItem;

  c.$onInit = function() {
    if (c.data.taskState != '3') {
      $rootScope.wrapper.actionLabel = 'Submit';
      $rootScope.wrapper.action = onSubmit;
    }
  };

  function titleClicked() {
    $rootScope.wrapper.actionEnabled = true;
  }

  function selectItem(category, item) {
    if (category.selectedItem == item.sys_id) {
      category.selectedItem = null;
    } else {
      category.selectedItem = item.sys_id;
    }

    function selectedValueIsNull(value) {
      return value.selectedItem == null || value.selectedItem === undefined;
    }

    $rootScope.wrapper.actionEnabled = c.data.categories.filter(selectedValueIsNull).length === 0;
  }

  function onSubmit() {
    console.log('Placing order..');
    $scope.$emit('next-task', { changeState: true });
    return;
    var listOfSelectedItems = c.data.categories.filter(function(value) {
      return value.selectedItem;
    });
    var listOfPromises = [];
    listOfSelectedItems.forEach(function(cat) {
      listOfPromises.push(
        $http
          .post('/api/sn_sc/v1/servicecatalog/items/' + cat.selectedItem + '/add_to_cart', {
            sysparm_quantity: 1
          })
          .then(
            function(value) {
              console.log('success', value);
            },
            function(reason) {
              alert(reason.data.error.message);
            }
          )
      );
    });

    $q.all(listOfPromises).then(function(value) {
      console.log('all Items added to cart! Place the other', value);
      $http.post('/api/sn_sc/servicecatalog/cart/submit_order').then(function() {
        $scope.$emit('next-task', { changeState: true });
      });
    });
  }
}

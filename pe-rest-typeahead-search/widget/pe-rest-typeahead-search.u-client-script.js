function PeRestTypeaheadController($rootScope, $scope) {
  var c = this;
  c.idName = 'pe-rest-typeahead-search' + c.data.widget_sys_id;

  c.$onInit = function () {
    c.apiUrl = c.data.uri + 'api/now/table/' + c.options.table +
      '?sysparm_display_value=true&sysparm_fields=sys_id,' + c.options.query_field + ',' + c.options.display_field +
      '&sysparm_limit=' + c.options.limit_result;
    c.fieldCondition = '';

    if ((c.options.order_direction == 'asc' || !c.options.order_direction) && c.options.order_by && c.options.order_by.length > 0)
      c.fieldCondition = '^ORDERBY' + c.options.order_by + '^';
    if (c.options.order_direction == 'desc' && c.options.order_by && c.options.order_by.length > 0)
      c.fieldCondition = '^ORDERBYDESC' + c.options.order_by + '^';

    c.fieldCondition = c.fieldCondition + c.options.filter + '^' + c.options.query_field + 'LIKE';

    c.selected = false;
    c.typing = false;
    console.log($scope);
  };

  c.selectRecord = function (obj) {
    console.log('selected -> ', obj);
    $rootScope.$broadcast('pe-typeahead-selection', obj);
  };

}

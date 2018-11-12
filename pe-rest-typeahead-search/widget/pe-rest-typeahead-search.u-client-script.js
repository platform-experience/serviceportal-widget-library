function PeRestTypeaheadController($rootScope) {
  var c = this;

  c.$onInit = function () {
    if (c.options.rest_instance_name)
      c.data.uri = 'https://' + c.options.rest_instance_name + '.service-now.com/';

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
    c.className = 'pe-typeahead-search-i' + c.widget.rectangle_id;
    c.current = {};
  };

  c.sendRequest = function (query, callback) {
    var requestBody = "";
    var response = {};
    var client = new XMLHttpRequest();
    client.open("get", c.apiUrl + '&sysparm_query=' + c.fieldCondition + query);
    client.setRequestHeader('Accept', 'application/json');
    client.setRequestHeader('Content-Type', 'application/json');
    client.setRequestHeader('Authorization', 'Basic ' + btoa(c.options.rest_username + ':' + c.options.rest_password));
    client.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        response = JSON.parse(this.response).result;
        callback(this.readyState, response);
      }
    };
    client.send(requestBody);
  };

  c.selectRecord = function (obj) {
    c.current = obj;
    $rootScope.$broadcast('pe-typeahead-selection', obj);
  };

}

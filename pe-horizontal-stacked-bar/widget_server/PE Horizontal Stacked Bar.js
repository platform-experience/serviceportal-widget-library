(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.lnumber = '$230';
  data.lnumber_text = 'SPENT';

  data.graph_data = input.graph_data || options.graph_data;
  data.graph_data = JSON.parse(data.graph_data);

})();
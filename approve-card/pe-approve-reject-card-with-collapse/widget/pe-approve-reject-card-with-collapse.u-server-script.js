(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.card_data = input.card_data || options.card_data;
  data.card_data = JSON.parse(data.card_data);
})();
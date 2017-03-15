(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.card_data = input.card_data || options.card_data;
  data.card_data = JSON.parse(data.card_data);

  if (data.isJson(data.card_data) === false) {
    data.card_data = JSON.parse(data.card_data);
  };

  data.isJson = function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

})();
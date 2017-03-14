(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.cardData = input.card_data || options.card_data;
  data.cardData = JSON.parse(data.cardData);
})();
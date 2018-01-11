(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.uri = gs.getProperty('glide.servlet.uri');

  if (input) {
    data.table = input.table || options.table;
    data.columns = input.columns || options.columns;
    data.columnCondition = input.column_condition || options.column_condition;
    data.columnDisplay = input.column_display || options.column_display;
  } else {
    data.table = options.table;
    data.columns = options.columns;
    data.columnCondition = options.column_condition;
    data.columnDisplay = options.column_display;
  }
})();

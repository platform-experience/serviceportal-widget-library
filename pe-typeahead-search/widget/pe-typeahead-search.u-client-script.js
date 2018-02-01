function PETypeAheadCtrl() {
  /* widget controller */
  var c = this;

  c.idName = 'idtypeahead1';
  c.placeholder = 'Search';

  c.apiUrl =
    c.data.uri +
    'api/now/table/' +
    c.data.table +
    '?sysparm_display_value=true';
  if (c.data.columns && c.data.columns.length > 0)
  {c.apiUrl = c.apiUrl + '&sysparm_fields=' + c.data.columns;}

  c.fieldCondition = c.data.columnCondition + 'LIKE';
  c.fieldDisplay = c.data.columnDisplay;

  //default values
  if (!c.minLength) {c.minLength = 1;}

  c.selectRecord = function(value) {
    console.log(value);
  };
}

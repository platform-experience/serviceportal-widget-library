(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.flagthumbnails = true;
  data.flagpreview = true;

  if (input) {
    data.table = input.table || options.table;
    data.display_field = input.display_field || options.display_field;
    data.lookup_field = input.lookup_field || options.lookup_field;
    options.secondary_fields = options.secondary_fields || "";

    data.barcode = input.barcode;
    if (data.barcode)
      data.barcode = data.barcode.trim();

    data.products = [];

    var ret = new GlideRecord(data.table);
    ret.addQuery(data.lookup_field, 'CONTAINS', data.barcode);
    ret.query();
    var temp = {};
    while (ret.next()) {
      temp = {};
      temp.sys_id = ret.getUniqueValue();
      temp.label = ret.getDisplayValue(data.display_field);
      temp.lookup_value = ret.getDisplayValue(data.lookup_field);
      temp.secondary_fields = $sp.getFields(ret, options.secondary_fields);

      data.products.push(temp);
    }

  }

})();
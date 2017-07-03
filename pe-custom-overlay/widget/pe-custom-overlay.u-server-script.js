(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  data.sampleSet = {};

  var ret = new GlideRecord('sc_cat_item');
  ret.addQuery('sys_id', '060f3afa3731300054b6a3549dbe5d3e');
  ret.query();

  while (ret.next()) {
    data.sampleSet.name = ret.getDisplayValue('name');
    data.sampleSet.picture = ret.getDisplayValue('picture');
    data.sampleSet.state = 'Transfer Service';
  }

})();
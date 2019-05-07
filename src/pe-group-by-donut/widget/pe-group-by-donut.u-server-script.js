(function() {
  var filter = options.filter || input.filter || 'active=true^EQ';
  var table = options.table || input.table || 'sn_customerservice_case';
  var groupBy = 'priority';
  if (options && options.field_list || input && input.field_list) {
    groupBy = options.field_list.split(',')[0] || input.field_list.split(',')[0];
  }
  data.prefix = groupBy.charAt(0).toUpperCase();

  var aggregates = [];
  var total = 0;

  var ga = new GlideAggregate(table);
  data.pluralTableName = ga.getED().getPlural();
  ga.addEncodedQuery(filter);
  ga.addAggregate('COUNT');

  if (input && input.tabClicked == 'my_records') {
    ga.addQuery('assigned_to', gs.getUserID());
  }

  ga.groupBy(groupBy);
  ga.orderBy(groupBy);
  ga.query();

  while (ga.next()) {
    var count = ga.getAggregate('COUNT') * 1;
    aggregates.push({
      value: ga.getValue(groupBy) + '',
      name: ga.getDisplayValue(groupBy) + '' || '(empty)',
      count: count
    });
    total += count;
  }

  // Prepare output objects
  data.title = total;
  data.series = [{
    name: data.pluralTableName,
    data: []
  }];

  if (input && input.seriesData) {
    // If aggregates does not contain value from seriesData then add it
    input.seriesData.forEach(function(series, i) {
      if (!aggregates.some(function(a) { return a.value == series.value; })) {
        aggregates.splice(i, 0, series);
      }
    });
  }

  aggregates.forEach(function(aggregate) {
    var q = 'active=true';
    if (aggregate.name != '(empty)') {
      q += '^' + groupBy + '=' + aggregate.value;
    }
    if (input && input.tabClicked == 'my_records') {
      q += '^assigned_to=' + gs.getUserID();
    }
    q += '^EQ';

    var t = input && input.tabClicked == 'my_records' ? 'My ' : 'All ';
    if (aggregate.name != '(empty)') {
      t += aggregate.name + ' ';
    }
    t += data.pluralTableName;

    data.labelLength = Math.max(data.labelLength || 0, aggregate.value.length);

    data.series[0].data.push({
      name: aggregate.name,
      y: aggregate.count || 0,
      key: aggregate.value,
      q: q,
      t: t
    });
  });
})();
(function () {
    input = input || {};
    var table = options.table || input.table;
    var sys_id = options.sys_id || input.sys_id;
    var query = options.query || input.query;
    view = input.view || "sp";

    if (!table || !sys_id)
        return;

    var f = $sp.getForm(table, sys_id, query);
    data.related_lists = f._related_lists;

    for (var i in data.related_lists) {
        var list = data.related_lists[i];
        var params = {
            table: list.table,
            filter: list.field + "=" + sys_id,
            view: view,
            inline_editing: options.inline_editing,
            title: list.label
        };
        list.widget = $sp.getWidget('inline-editing-data-table', params);
    }
    
})();

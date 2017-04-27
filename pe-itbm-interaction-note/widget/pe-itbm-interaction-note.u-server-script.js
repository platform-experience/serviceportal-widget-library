(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    data.users = [];
    data.activeUsers = false;

    data.groupName = options.group_name || "Test Group";
    data.cardTitle = options.card_title || "Interaction Form";

    var usgr = new GlideRecord('sys_user_group');
    usgr.addQuery('name', data.groupName);
    usgr.query();

    if (usgr.next()) {
        var grmem = new GlideRecord('sys_user_grmember');
        grmem.addQuery('group', usgr.sys_id);
        grmem.query();
        var x = 0;
        while (grmem.next()) {
            var usr = new GlideRecord('sys_user');
            usr.addQuery('sys_id', grmem.user.toString());
            usr.query();
            if (usr.next()) {
                var user = {
                    'id': grmem.user.toString(),
                    'name': usr.user_name.getDisplayValue(),
                    'lname': usr.last_name.getDisplayValue(),
                    'fname': usr.first_name.getDisplayValue(),
                    'title': usr.title.getDisplayValue(),
                    'photo': usr.photo.getDisplayValue(),
                    'status': usr.active.getDisplayValue()
                }
                data.users.push(user);
            }
        }
    }
    data.activeUsers = (data.users.length > 0);
})();
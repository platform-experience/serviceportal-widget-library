(function () {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    if (input.action == 'updatePhoto') {
        var userGr = new GlideRecord('sys_user');
        if (userGr.get(gs.getUserID())) {
            data.user_photo = userGr.photo.getDisplayValue();
        }
        return;
    }
    if (input.action == 'deletePhoto') {
        var gr = new GlideRecord('sys_attachment');
        gr.addQuery('table_name', 'sys_user');
        gr.addQuery('name', 'photo');
        gr.addQuery('table_sys_id', gs.getUserID());
        gr.deleteMultiple(); //Deletes all records in the record set
        return;
    }
})();
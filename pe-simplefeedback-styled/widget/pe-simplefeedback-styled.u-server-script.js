(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    data.options = options;
    /*- User Info -*/
    var session = gs.getSession();
    var curUser = gs.getUser();

    data.tblExists = false;

    data.currentUser = {
        loggedIn: session.isLoggedIn(),
        sys_id: gs.getUserID(),
        name: curUser.getDisplayName(),
        email: curUser.getEmail()
    };

    /*- Form Button Options -*/
    data.options.showFormButton = (options.showFormButton === 'true');
    /*- Data Posting Options -*/
    data.tblExists = gs.tableExists(options.dataTable);
    data.options.autoHideTY = (options.autoHideTY === 'true');
    /*- Who Options -*/
    data.options.showWho = (options.showWho === 'true');

    if (input && Object.keys(input).length > 0) {
        if (input.action === 'PostFeedback') {
            var grFeedback = new GlideRecord(options.dataTable);

            grFeedback.initialize();

            grFeedback.u_name = input.feedback.who.toString();
            grFeedback.u_email = input.feedback.email.toString();
            grFeedback.u_rating = input.feedback.rating.toString();
            grFeedback.u_feedback = input.feedback.text.toString();
            grFeedback.u_location = input.feedback.location.toString();
            grFeedback.u_portal = input.feedback.portal.toString();
            grFeedback.u_portal_sys_id = input.feedback.portal_sysid.toString();
            grFeedback.u_page = input.feedback.page_id.toString();
            grFeedback.u_page_sys_id = input.feedback.page_sysid.toString();

            //grFeedback.u_other =   /* Big (4k) String field to catch any additional info [without having to modify the table]*/

            data.sys_id = grFeedback.insert();
        }
    }

})();
(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
    data.wdtOptions = {};
    /*- User Info -*/
    var session = gs.getSession();
    var curUser = gs.getUser();

    data.tblExists = false;

    data.currentUser = {
        loggedIn: session.isLoggedIn(),
        sys_id: gs.getUserID(),
        name: curUser.getFullName(),
        email: curUser.getEmail()
    };

    /*- Form Button Options -*/
    data.wdtOptions.showFormButton = options.showFormButton || serverOptions.showFormButton;
    data.wdtOptions.showFormButton = (data.wdtOptions.showFormButton === 'true');

    /*- Data Posting Options -*/
    data.wdtOptions.dataTable = options.dataTable || serverOptions.dataTable;
    data.tblExists = gs.tableExists(data.wdtOptions.dataTable);

    data.wdtOptions.autoHideTY = options.autoHideTY || serverOptions.autoHideTY;
    data.wdtOptions.autoHideTY = (data.wdtOptions.autoHideTY === 'true');

    data.wdtOptions.autoHideDuration = options.autoHideDuration || serverOptions.autoHideDuration;

    /*- Header Options -*/
    data.wdtOptions.hdrTitle = options.hdrTitle || serverOptions.hdrTitle;
    data.wdtOptions.hdrIcon = options.hdrIcon || serverOptions.hdrIcon;

    /*- Rating Options -*/
    data.wdtOptions.showRating = options.showRating || serverOptions.showRating;
    data.wdtOptions.showRating = (data.wdtOptions.showRating === 'true');

    data.wdtOptions.txtRating = options.txtRating || serverOptions.txtRating;
    data.wdtOptions.lvlRating = options.lvlRating || serverOptions.lvlRating;
    data.wdtOptions.lvlRatingTxt = options.lvlRatingTxt || serverOptions.lvlRatingTxt;
    if (data.wdtOptions.lvlRatingTxt.length > 0) {
        data.wdtOptions.lvlRatingTxt = JSON.parse(data.wdtOptions.lvlRatingTxt);
    }
    /*- Who Options -*/
    data.wdtOptions.showWho = options.showWho || serverOptions.showWho;
    data.wdtOptions.showWho = (data.wdtOptions.showWho === 'true');

    /*- Other Options -*/
    //Thank You Message
    data.wdtOptions.txtTYMsg = options.txtTYMsg || serverOptions.txtTYMsg;

    if (input) {
        data.serverInput = input;
        var grFeedback = new GlideRecord(input.wdtOptions.dataTable);

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

        data.serverInput.SysID = grFeedback.insert();
    }

})();
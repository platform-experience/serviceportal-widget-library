(function process(request, response) {
  try {
    var userID = '';
    var liveprofile = {};
    if (request.queryParams.user_id) {
      userID = request.queryParams.user_id;
      var gr = new GlideRecord('live_profile');
      gr.addQuery('table', 'sys_user');
      gr.addQuery('document', userID);
      gr.query();
      if (gr.next()) {
        liveprofile.profile_id = gr.sys_id.toString();
      } else {
        var grTwo = new GlideRecord('live_profile');
        grTwo.initialize();
        grTwo.table = 'sys_user';
        grTwo.document = userID;
        grTwo.type = 'User';

        var gruser = new GlideRecord('sys_user');
        gruser.addQuery('sys_id', userID);
        gruser.query();
        if (gruser.next()) {
          grTwo.name = gruser.name.toString();
          liveprofile.profile_id = grTwo.insert();
        }
      }
    }
    if (liveprofile)
      response.setBody(liveprofile);
    else
      response.setBody('Error');
  } catch (e) {
    response.setBody('Error : ' + e.message);
  }
})(request, response);
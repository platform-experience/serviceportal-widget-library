function peCSMTimlineCtrl(spUtil) {
    /* widget controller */
    var c = this;

    spUtil.get('pe-people-info', {
        user_sys_id: c.data.user_info.user_sys_id,
        show_job_title: c.data.user_info.show_job_title,
        show_call_and_chat: c.data.user_info.show_call_and_chat,
        show_only_picture: c.data.user_info.show_only_picture,
        add_border_around_avatar: c.data.user_info.avatar_border
    }).then(function(response) {
        c.data.embedded_widget = response;
    });


}
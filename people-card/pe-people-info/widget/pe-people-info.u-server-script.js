(function() {
    data.user_sys_id = input.user_sys_id || options.user_sys_id;

    var getBoolValue = function(inputVal, optionVal) {
        if (inputVal === null || inputVal === "" || inputVal === undefined) {
            if (typeof optionVal === 'string') {
                return (optionVal === 'true');
            } else {
                return (optionVal === true);
            }
        } else {
            if (typeof inputVal === 'string') {
                return (inputVal === 'true');
            } else {
                return (inputVal === true);
            }
        }
    };

    var userGR = new GlideRecord('sys_user');
    if (userGR.get(data.user_sys_id)) {
        data.user_first_name = userGR.getDisplayValue('first_name');
        data.user_last_name = userGR.getDisplayValue('last_name');
        data.user_full_name = userGR.getDisplayValue('name');
        data.user_job_title = userGR.getDisplayValue('title');
        data.user_photo = userGR.getDisplayValue('photo');
        data.user_phone = userGR.phone.toString().replace(/[- )(]/g, '');
        data.user_initials = data.user_first_name.charAt(0) + data.user_last_name.charAt(0);
    }

    data.avatar_border = input.add_border_color_around_avatar || options.add_border_color_around_avatar;
    data.show_only_picture = getBoolValue(input.show_only_picture, options.show_only_picture);
    data.show_job_title = getBoolValue(input.show_job_title, options.show_job_title);
    data.show_call_and_chat = getBoolValue(input.show_call_and_chat, options.show_call_and_chat);
    data.show_text_below_picture = getBoolValue(input.show_text_below_picture, options.show_text_below_picture);

})();
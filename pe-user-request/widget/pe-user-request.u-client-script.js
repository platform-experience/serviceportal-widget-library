function UserRequestController($timeout, spUtil) {
    var c = this;
    c.sendRequest = sendRequest;

    c.$onInit = function() {
        c.step = 1;
        getUserInfo();
        activateWidget();
    };

    function activateWidget() {
        spUtil.get('pe-people-info', {
            user_sys_id: c.data.userInfo.userSysId,
            show_job_title: c.data.userInfo.showJobTitle,
            show_call_and_chat: c.data.userInfo.showCallAndChat,
            show_only_picture: c.data.userInfo.showOnlyPicture
        }).then(function(response) {
            c.data.peopleInfoWidget = response;
        });
    }

    function getUserInfo() {
        c.data.userInfo = {
            userSysId: '20b26776dbc2720062e479daae9619dc',
            showOnlyPicture: c.options.show_only_pic,
            showJobTitle: c.options.show_job_title,
            showCallAndChat: c.options.show_call_chat
        };
    }

    function sendRequest() {
        c.step = 2;
        $timeout(function() {
            c.step = 3;
            $timeout(function() {
                c.step = 1;
            }, 3000);
        }, 2000);
    }
}
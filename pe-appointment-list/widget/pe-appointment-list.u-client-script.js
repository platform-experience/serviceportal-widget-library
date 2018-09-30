function appointmentList($rootScope, $timeout, $scope, $window, spUtil) {
    var c = this;

    c.$onInit = function () {
        $scope.userID = $scope.user.sys_id;
        c.toggleDelete = {};
        c.noAppointments = false;
        c.removeAppt = removeAppt;
        c.cancelAppt = cancelAppt;
        c.deleteAppt = deleteAppt;
        c.parseDateTime = parseDateTime;
        getCurrentAppointments();
    };

    function removeAppt(sys_id) {
        c.toggleDelete[sys_id].confirm = true;
        c.toggleDelete[sys_id].show = false;
    }

    function cancelAppt(sys_id) {
        c.toggleDelete[sys_id].confirm = false;
        c.toggleDelete[sys_id].show = true;
    }

    function deleteAppt(sys_id) {

        c.server.get({
            action: 'deleteTimeSlot',
            taskSysid: sys_id
        }).then(function (response) {
            c.toggleDelete[sys_id].confirm = false;
            c.toggleDelete[sys_id].show = false;
            getCurrentAppointments();
        });

    }

    function parseDateTime(slotTime, type) {
        var dt = slotTime.split(" ")[0];
        var time = slotTime.split(" ")[1].split(":");
        var parsed = [4];

        //Date
        parsed[0] = moment(dt).format("dddd, MMMM D YYYY");

        //Time
        if (time[0] > 12) {
            parsed[1] = (time[0] - 12) + ":" + time[1] + "PM";
        } else {
            parsed[1] = time[0] + ":" + time[1] + "AM";
        }
        if (parsed[1].split("")[0] === "0") {
            parsed[1] = parsed[1].substring(1, parsed[1].length);
        }

        //Day of Week
        parsed[2] = moment(dt).format("ddd");

        //Short Date (no year)
        parsed[3] = moment(dt).format("MMM D");

        return parsed[type];
    }


    $rootScope.$on('appointmentCreated', function (event, data) {
        getCurrentAppointments();
    });

    function getCurrentAppointments() {
        c.server.get({
            action: 'getCurrentAppointments'
        }).then(function (response) {
            if (JSON.parse(response.data.currentAppointments).length > 0) {
                c.currentUserAppointments = processTheTimes(JSON.parse(response.data.currentAppointments));
                c.noAppointments = false;
            } else {
                c.noAppointments = true;
            }
        });
    }

    function processTheTimes(appointments) {
        for (var i = 0; i < appointments.length; i++) {
            appointments[i].work_in = moment(appointments[i].work_start).fromNow();
            appointments[i].today = (moment().diff(appointments[i].work_start, 'days') === 0);
            if (appointments[i].duration > 0) {
                appointments[i].duration = Math.floor(appointments[i].duration / 60);
            }

            appointments[i].time = c.parseDateTime(appointments[i].work_start, 1)
            appointments[i].weekday = c.parseDateTime(appointments[i].work_start, 2)
            appointments[i].day = c.parseDateTime(appointments[i].work_start, 3)
            c.toggleDelete[appointments[i].sys_id] = {
                confirm: false,
                show: true
            };
        }
        return appointments;
    }
}
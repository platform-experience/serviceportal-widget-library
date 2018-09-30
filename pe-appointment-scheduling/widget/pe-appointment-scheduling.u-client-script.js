function scheduleAppointment($rootScope, $timeout, $http, $scope) {
    var c = this;

    c.$onInit = function () {
        c.selectedSlot = "";
        c.timeSlotReturn = "";
        c.alertSuccess = false;
        c.setReminder = false;
        c.appntShortDescription = "";
        c.appntDescription = "";
        c.appntLocationSysid = "";
        c.selectedReminderTime = c.data.reminderTimes[0];

        c.getTimeSlots = getTimeSlots;
        c.locationChosen = locationChosen;
        c.getLocations = getLocations;
        c.setupReminder = setupReminder;
        c.disabled = disabled;
        c.openDatePickerPopup = openDatePickerPopup;
        c.submitTimeSlot = submitTimeSlot;
        c.datePickerPopup = {
            opened: false
        };
        var today = new Date();
        if (!c.options.max_date) {
            c.options.max_date = 30;
        }
        c.dateOptions = {
            showWeeks: false,
            formatYear: 'yyyy',
            maxDate: today.setDate(today.getDate() + parseInt(c.options.max_date)),
            minDate: populateDate(),
            startingDay: 1
        };


    }

    function getTimeSlots(date) {
        c.dateFormatted = moment(date).format("dddd, MMMM D YYYY");
        c.server
            .get({
                action: 'getTimeSlots',
                selectedDate: moment(date).format("YYYY-MM-DD")
            })
            .then(function (response) {
                if (response.data.timeSlots && response.data.timeSlots.length > 0) {
                    c.timeSLots = JSON.parse(response.data.timeSlots);
                    if (c.options.layout == 'Dropdown') {
                        c.selectedSlot = c.timeSLots[0];
                    }
                }

            });
    };

    function locationChosen(location) {
        c.appntLocation = location;
        c.appntLocationSysid = location.sys_id;
    }

    function getLocations(val) {
        return $http
            .get('/api/now/table/cmn_location?sysparm_query=nameLIKE' + val + '^ORstreetLIKE' + val + '^ORcityLIKE' + val + '^ORstateLIKE' + val + '&sysparm_limit=5', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-UserToken': window.g_ck
                }
            })
            .then(function (response) {

                return response.data.result;
            });
    };

    function setupReminder(reminderTime) {
        c.server
            .get({action: 'setupReminder', selectedTime: reminderTime, taskSysid: c.timeSlotReturn.sys_id})
            .then(function (response) {
                c.reminderSetup = response.data.reminderReturn;
                $timeout(function () {
                    c.alertSuccess = false;
                    c.setReminder = false;
                }, 5000);
            });
    }

    function processTheTimes(appointments) {
        for (var i = 0; i < appointments.length; i++) {
            appointments[i].work_start = moment(appointments[i].work_start).fromNow();
            if (appointments[i].duration > 0) {
                appointments[i].duration = Math.floor(appointments[i].duration / 60);
            }
        }
        return appointments;
    }

    // Disable weekend selection
    function disabled(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    }

    function openDatePickerPopup() {
        c.datePickerPopup.opened = true;
    };

    function submitTimeSlot(selectedDate, selectedSlot) {
        var obj = {
            'action': 'setTimeSlots',
            'meetingDate': selectedDate,
            'meetingTime': selectedSlot
        }
        if (c.appntLocation || c.appntDescription || c.appntShortDescription) {
            obj.additionalFields = {
                'short_description': c.appntShortDescription,
                'description': c.appntDescription,
                'location': c.appntLocationSysid
            }
        }

        c.server
            .get(obj)
            .then(function (response) {
                if (response.data.timeSlotReturn) {
                    c.timeSlotReturn = JSON.parse(response.data.timeSlotReturn);
                    if (c.timeSlotReturn.sys_id) {
                        c.alertSuccess = true;
                        if (c.setReminder) {
                            c.setupReminder(c.selectedReminderTime.value.display_value);
                        }
                        c.getTimeSlots(selectedDate);
                        c.appntShortDescription = "";
                        c.appntDescription = "";
                        c.appntLocationSysid = "";
                        c.appntLocation = "";
                        $rootScope.$broadcast('appointmentCreated', '');
                    }
                }
            });
    };

    function populateDate() {
        c.minDate = new Date();
        c.getTimeSlots(c.minDate);
        c.selectedDate = c.minDate;
        c.dateFormatted = moment(c.selectedDate).format("dddd, MMMM D YYYY");
        return c.minDate;
    }
}
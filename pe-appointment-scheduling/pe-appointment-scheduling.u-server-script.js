// populate the 'data' variable with catalog item, variables, and variable view
(function() {

    data.reminderTimes = getReminderChoices();

    function getReminderChoices() {
        var tempArray = [];
        var reminderGR = new GlideRecord('sys_choice');
        reminderGR.addQuery('element', 'remind_me');
        reminderGR.addQuery('inactive', false);
        reminderGR.orderBy('sequence');
        reminderGR.query();
        while (reminderGR.next()) {
            var obj = {};
            $sp.getRecordElements(obj, reminderGR, 'label,sys_id,value');
            tempArray.push(obj);
        }
        return tempArray;
    }

    if (input) {
        if (input.action == 'getTimeSlots') {
            data.timeSlots = new global.TaskAppointmentUtils().getTimeSlots(options.task_appointment_record, input.selectedDate);
        }
        if (input.action == 'setTimeSlots') {
            data.timeSlotReturn = new global.TaskAppointmentUtils().createAppointment(options.task_appointment_record, input.meetingTime, input.additionalFields);
        }
        if (input.action == 'setupReminder') {
            data.reminderReturn = new global.TaskAppointmentUtils().createReminder(input.taskSysid, input.selectedTime)
        }
    }
})()
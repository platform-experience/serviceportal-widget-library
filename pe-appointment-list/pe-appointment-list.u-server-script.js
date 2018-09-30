// populate the 'data' variable with catalog item, variables, and variable view
(function() {
    if (input) {
        if (input.action == 'getCurrentAppointments') {
            data.currentAppointments = new global.TaskAppointmentUtils().getUserAppointments(options.task_appointment);
        }
        if (input.action == 'deleteTimeSlot') {
            data.deleted = new global.TaskAppointmentUtils().removeAppointment(options.task_appointment, input.taskSysid);
        }
    }
})();
function AppointmentScheduler() {

  var c = this;

  c.morningTimes = ["9:00 AM - 12:00 PM"];
  c.afternoonTimes = ["1:00 PM - 4:00 PM", "2:00 PM - 5:00 PM", "3:00 PM - 6:00 PM"];
  c.eveningTimes = ["4:00 PM - 7:00 PM", "5:00 PM - 8:00 PM"];
  c.lateTimes = ["6:00 PM - 9:00 PM"];

  c.daysArray = [];
  var dayWord = '';
  var dayNumber = '';
  var monthWord = '';

  for (var i = 0; i < 180; i++) {
    dayWord = moment().add(i, "days").format("ddd");
    dayNumber = moment().add(i, "days").format("D");
    monthWord = moment().add(i, "days").format("MMM");
    c.daysArray.push({
      "dayWord": dayWord,
      "dayNumber": dayNumber,
      "monthWord": monthWord
    });
  }

  c.select = function (index, number, word) {
    c.selected = index;
    c.selectedNumber = number;
    c.selectedWord = word;
    $('#timeSplash').addClass('hidden');
    $('#timeSection').removeClass('hidden');
  };

  c.confirmMorning = function (index, time) {
    c.selectedTime = time;
    c.timeSelected = 'mo' + index;
    $('div.confirm-btn').removeClass('invisible');
  };

  c.confirmAfternoon = function (index, time) {
    c.selectedTime = time;
    c.timeSelected = 'af' + index;
    $('div.confirm-btn').removeClass('invisible');
  };

  c.confirmEvening = function (index, time) {
    c.selectedTime = time;
    c.timeSelected = 'ev' + index;
    $('div.confirm-btn').removeClass('invisible');
  };

  c.confirmLate = function (index, time) {
    c.selectedTime = time;
    c.timeSelected = 'la' + index;
    $('div.confirm-btn').removeClass('invisible');
  };

}
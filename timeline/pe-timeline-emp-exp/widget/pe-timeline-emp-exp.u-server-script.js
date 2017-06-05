(function() {
  var getBoolValue = function(inputVal, optionVal) {
    if (inputVal === null) {
      return (optionVal === 'true');
    } else {
      return (inputVal === 'true');
    }
  };

  var getIntValue = function(inputVal, optionVal) {
    if ((inputVal === null || inputVal === undefined) && (optionVal >= 0)) {
      return (parseInt(optionVal));
    } else if (inputVal !== null && inputVal !== undefined) {
      return (parseInt(inputVal));
    }
  };

  data.show_ldescriptions = getBoolValue(input.show_ldescriptions, options.show_ldescriptions);
})();
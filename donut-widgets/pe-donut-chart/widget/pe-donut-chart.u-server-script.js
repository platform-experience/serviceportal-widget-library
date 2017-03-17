(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  var getBoolValue = function (inputVal, optionVal) {

    if (inputVal === null || inputVal === "" || inputVal === undefined) {
      return (optionVal === 'true');
    } else {
      return (inputVal === 'true');
    }
  };


  data.title = input.title || options.title;
  /*  data.percentage = input.percentage || options.percentage;
    data.percentage = parseInt(data.percentage);
    data.percentage = (data.percentage*200)/100;*/

  data.active_color = input.active_color || options.active_color;
  data.background_color = input.background_color || options.background_color;
  data.fa_icon = input.fa_icon || options.fa_icon;

  data.show_title = getBoolValue(input.show_title, options.show_title);
  data.show_icon = getBoolValue(input.show_icon, options.show_icon);
  //data.border_width = input.border_width || options.border_width;
  data.border_width = 12;
  data.height = 34;
  data.width = 34;

  data.r = 0;
  data.cx = 0;
  data.cy = 0;

  data.r = (data.width * 32) / 100;
  data.cx = data.width / 2;
  data.cy = data.height / 2;

  data.strokeDashArray = 68.36;
  data.strokeDashOffset = 68.36;

  data.circumference = (data.r * 2 * Math.PI);
  data.strokeDashArray = data.circumference;
  data.strokeDashOffset = data.circumference;


})();
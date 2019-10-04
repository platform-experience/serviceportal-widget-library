(function() {
  input = input || {};
  options.travel_mode = input.travel_mode || options.travel_mode;
  options.origin = input.origin || options.origin;
  options.destination = input.destination || options.destination;
  options.current_position = input.current_position || options.current_position;
  options.current_position_image =
    input.current_position_image || options.current_position_image;
  if (options.styles) {
    options.styles = JSON.parse(options.styles);
  }
})();

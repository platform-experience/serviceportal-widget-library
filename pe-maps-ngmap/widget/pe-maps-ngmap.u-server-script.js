(function () {
  data.place_origin = input.place_origin || options.place_origin;
  data.place_destination = input.place_destination || options.place_destination;
  data.map_zoom = input.map_zoom || options.map_zoom;
  data.header_visibility = input.header_visibility || options.header_visibility;
  data.header_visibility = (data.header_visibility == 'true');

  data.transit_mode_all = [
    'Walking',
    'Bicycling',
    'Driving',
    'Transit',
    ''];

  data.transit_mode = data.transit_mode_all[0];

  if (!data.place_origin)
    data.place_origin = '';

  if (!data.place_destination)
    data.place_destination = '';

  if (!data.map_zoom)
    data.map_zoom = 14;

  data.form_visibility = true;
  if (data.place_origin.length > 0)
    data.form_visibility = false;

})();
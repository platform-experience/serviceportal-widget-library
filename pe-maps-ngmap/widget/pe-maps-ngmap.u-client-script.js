function NdlNgMapController(NgMap, $scope, $timeout) {
  /* widget controller */
  var c = this;

  c.cleanForm = function () {
    c.data.place_origin = '';
    c.data.place_destination = '';
    c.data.map_zoom = 14;
    c.data.transit_mode = c.data.transit_mode_all[0];
  };

}
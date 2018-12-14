function ImageLink(scope, elem, attr) {
  scope.style = {
    'background-image': 'url(' + scope.options.image_url + ')',
    'background-position': scope.options.image_pos || 'center'
  };
}

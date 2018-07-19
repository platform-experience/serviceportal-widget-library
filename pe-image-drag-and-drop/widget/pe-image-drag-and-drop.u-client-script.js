function ImageDragAndDropController($scope) {
  var c = this;
  c.files = [];

  // Set options for dropzone
  $scope.dzOptions = {
    url: '/alt_upload_url',
    paramName: 'photo',
    maxFilesize: '10',
    acceptedFiles: 'image/jpeg, images/jpg, image/png',
    addRemoveLinks: true,
    autoProcessQueue: true
  };

  // Handle events for dropzone
  $scope.dzCallbacks = {
    addedfile: function(file) {
      $scope.newFile = file;
    },
    success: function(file, xhr) {
      c.server
        .get({
          action: 'insert',
          name: file.name,
          type: file.type,
          image: file.dataURL.substring(
            file.dataURL.indexOf('base64,') + 7,
            file.dataURL.length
          ),
          uuid: file.upload.uuid
        })
        .then(function(response) {
          c.files.push(response.data.file);
          console.log('response', response.data);
          console.log('total files for now', c.files);
        });
    },
    removedfile: function(file) {
      var fileToRemove = {};

      for (i = 0; i < c.files.length; i++) {
        if (c.files[i].uuid == file.upload.uuid) {
          fileToRemove = c.files[i];
        }
      }

      c.server
        .get({
          action: 'remove',
          file: fileToRemove
        })
        .then(function(response) {
          console.log('response Delete', response.data);
          console.log('total files for now', c.files);
        });
    }
  };
}

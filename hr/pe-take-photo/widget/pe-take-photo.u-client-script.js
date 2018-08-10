function TaskCredentialController($http, $rootScope, $scope) {
  var c = this;
  c.takeSelfie = takeSelfie;
  c.triggerSelfieButton = triggerSelfieButton;

  c.$onInit = function() {
    $rootScope.wrapper.actionEnabled = true;
    $rootScope.wrapper.actionLabel = 'Take Photo';
    $rootScope.wrapper.action = c.triggerSelfieButton; // this comes from Link function

    if (c.data.task.state == '3') {
      $rootScope.wrapper.actionLabel = 'Next';
      $rootScope.wrapper.action = function() {
        $scope.$emit('next-task');
      };
    }
  };

  function onSubmit() {
    replaceImage(c.pic, 'sys_user', $scope.user.sys_id, 'photo', function() {
      $scope.$emit('next-task', { changeState: true });
    });
  }

  function triggerSelfieButton() {
    c.triggerSelfieButtonLinkFn();
  }

  function takeSelfie(file) {
    c.pic = file;
    $rootScope.wrapper.actionLabel = 'Submit';
    $rootScope.wrapper.action = onSubmit;
  }

  function uploadImage(file, table_name, table_sys_id, field_name) {
    var urlUpload =
      '/api/now/v1/attachment/file?table_name=' +
      table_name +
      '&table_sys_id=' +
      table_sys_id +
      '&file_name=' +
      field_name;

    return $http.post(urlUpload, file, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': file.type,
        Accept: 'application/json, text/plain, */*'
      }
    });
  }

  function getImageSysId(table_name, table_sys_id, field_name, return_val) {
    var urlGet =
      '/api/now/v1/attachment' +
      '?sysparm_query=table_name%3D' +
      table_name +
      '%5Etable_sys_id%3D' +
      table_sys_id +
      '%5Efile_name%3D' +
      field_name;
    var parent = this;
    $http
      .get(urlGet, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if (
            response &&
            response.data &&
            response.data.result &&
            response.data.result.length &&
            response.data.result.length > 0
          ) {
            return_val(response.data.result[0].sys_id);
          } else {
            return_val(null);
          }
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }
      );
  }

  function deleteImage(sys_id) {
    var urlDelete = '/api/now/v1/attachment/' + sys_id;
    return $http
      .delete(urlDelete, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }
      );
  }

  function replaceImage(file, table_name, table_sys_id, field_name, callback) {
    getImageSysId(table_name, table_sys_id, field_name, function(sys_id) {
      if (sys_id) {
        deleteImage(sys_id);
      }
      uploadImage(file, table_name, table_sys_id, field_name).then(callback);
    });
  }
}

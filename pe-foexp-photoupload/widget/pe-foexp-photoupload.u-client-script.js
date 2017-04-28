function UploadPhotoCtrl($rootScope, $scope, $http, spUtil, Upload) {
    /* widget controller */
    var c = this;
    c.upload = upload;

    c.$onInit = function () {
        $rootScope.title = "UPLOAD PHOTO";

        if (!c.data.init) {
            c.data.init = true;
            spUtil.recordWatch($rootScope, "sys_user", "sys_id=" + $scope.user.sys_id, updatePicture);
        }
    };

    function upload(file) {
        c.photoUploading = true;
        c.photoUploaded = false;
        $scope.user.photo = null;

        Upload.resize(file, '', '', '1', "image/jpeg", "1:1", true).then(function (smallFile) {
            Upload.base64DataUrl(smallFile).then(function (url) {
                var base64part = url.substr(url.indexOf('base64,') + 'base64,'.length);

                c.server.get({action: 'deletePhoto'}).then(function (r) {
                    $http.post('/api/now/table/ecc_queue', {
                        agent: "Uploading photo",
                        topic: "AttachmentCreator",
                        name: "photo:image/jpeg",
                        source: "sys_user:" + $scope.user.sys_id,
                        payload: base64part
                    }, {
                        headers: {
                            Accept: "application/json",
                            'Content-Type': "application/json",
                            'X-UserToken': window.g_ck
                        }
                    }).then(function (result) {
                        c.photoUploaded = true;
                        c.photoUploading = false;
                        c.server.get({action: 'updatePhoto'}).then(function (response) {
                            $scope.user.photo = response.data.user_photo;
                        })
                    });
                });

            });
        });
    }

    function updatePicture() {
        alert('update Picture')
    }
}
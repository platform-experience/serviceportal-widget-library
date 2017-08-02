function FormFormlyCtrl() {
  /* widget controller */
  var c = this;

  c.data.formData = {};

  c.submit = function (data) {
    console.log(data);
  };

}
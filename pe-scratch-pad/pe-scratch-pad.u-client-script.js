function ScratchPadController() {
  var c = this;
  c.done = done;

  function done() {
    var signature = c.accept();
    if (signature.isEmpty) {
      console.log('scratch pad empty');
    } else {
      console.log(signature.dataUrl);
    }
  }
}
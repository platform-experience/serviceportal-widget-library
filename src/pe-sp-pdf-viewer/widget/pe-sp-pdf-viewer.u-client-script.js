function PdfViewerController(pdfDelegate, $timeout) {
  var c = this;
  c.$onInit = function() {
    if (c.data.url.length == 0) return;
    $timeout(function() {
      c.pdf = pdfDelegate.$getByHandle("my-pdf-container");
      if (c.isMobile) {
        c.pdf.zoomTo((0.5 * 356) / 307 + "");
      }
    }, 250);
  };
}

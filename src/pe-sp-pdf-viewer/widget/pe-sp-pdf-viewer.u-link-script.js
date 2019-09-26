function link(scope, element, attrs, controller) {
  controller.isMobile = false;
  if ($("#check-mobile").css("display") == "none") {
    controller.isMobile = true;
  }

  $(document).ready(function() {
    scope.$watch(scope, function(newValues, oldValues, scope) {
      setTimeout(function() {
        var toolbar = $("body").find("pdf-viewer-toolbar");
        toolbar.find("input").each(function() {
          var value = $(this).val();
          var size = value.length;
          $(this).css("width", size * 3);
        });
        toolbar.find("input").keyup(function() {
          var value = $(this).val();
          var size = value.length;
          size = size * 4;
          $(this).css("width", size * 3);
        });
      }, 550);
    });
  });
}

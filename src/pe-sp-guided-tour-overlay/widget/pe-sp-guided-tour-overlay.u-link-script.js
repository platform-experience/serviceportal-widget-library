function link(scope, element, attrs, controller) {
  function setBeautyfication() {
    setTimeout(function() {
      controller.bodyEl
        .find(".tour-tour_" + controller.data.tour.sys_id)
        .css("box-shadow", "none");
    }, 1500);
  }

  function removeStylesFromElement(tourEl, cssObj) {
    for (var key in cssObj) {
      if (cssObj.hasOwnProperty(key)) {
        tourEl.css(key, "");
      }
    }
  }

  function removeAllStylesFromTargets() {
    var sylesCSS = JSON.parse(controller.options.tour_css);
    var target_refs = controller.data.tour.target_refs;

    for (i = 0; i < target_refs.length; i++) {
      var tourEl = $(target_refs[i].css);
      var specificCSS = target_refs[i].added_styles;

      removeStylesFromElement(tourEl, sylesCSS);
      removeStylesFromElement(tourEl, specificCSS);

      if (target_refs[i].added_styles_td) {
        var tdEls = tourEl.find("td");
        removeStylesFromElement(tdEls, target_refs[i].added_styles_td);
      }
    }
  }

  function addOverlay() {
    var overlayEl = controller.bodyEl.find("#x-pisn-sp-gtd-overlay");
    if (overlayEl.length == 0) {
      var newOverlayEl = $(
        '<div id="x-pisn-sp-gtd-overlay" class="modal-backdrop fade in"></div>'
      );
      newOverlayEl.appendTo("body");
    } else {
      overlayEl
        .removeClass("out")
        .addClass("in")
        .css("display", "block");
    }
  }

  function removeOverlay() {
    var overlayEl = controller.bodyEl.find("#x-pisn-sp-gtd-overlay");
    if (overlayEl.length) {
      overlayEl
        .removeClass("in")
        .addClass("out")
        .css("display", "none");
    }
  }

  function addStyleToTarget(id) {
    var tourEl = $(controller.data.tour.target_refs[id].css);
    if (tourEl.length) {
      var cssStyles = JSON.parse(controller.options.tour_css);
      cssStyles = setCustomStyles(cssStyles, tourEl, id);
      controller.data.tour.target_refs[id].added_styles = cssStyles;
      tourEl.css(cssStyles);
    }
  }

  function setCustomStyles(cssStyles, tourEl, id) {
    switch (controller.data.tour.target_refs[id].element_type) {
      case "generic":
        if (tourEl.css("background-color") != "rgba(0, 0, 0, 0)")
          cssStyles["background-color"] = tourEl.css("background-color");
        else
          cssStyles["background-color"] =
            controller.options.tour_element_selected_bg;
        break;
      case "button":
        if (tourEl[0].nodeName == "TR") {
          var tdEls = tourEl.find("td");
          var cssStylesForTd = JSON.parse(controller.options.tour_css);

          tdEls.each(function(i, link) {
            if ($(link).css("background-color") == "rgba(0, 0, 0, 0)") {
              cssStylesForTd["background-color"] =
                controller.options.tour_element_selected_bg;
              $(link).css(cssStylesForTd);
              controller.data.tour.target_refs[
                id
              ].added_styles_td = cssStylesForTd;
            }
          });
        }
        break;
      case "link":
        // code block
        break;
      default:
      // code block
    }

    return cssStyles;
  }

  scope.tourEnded = function() {
    removeOverlay();
    removeAllStylesFromTargets();
  };

  scope.stepStarted = function(id) {
    controller.bodyEl = element.closest("body");
    setBeautyfication();
    if (id > 0) {
      removeAllStylesFromTargets();
    }
    addStyleToTarget(id);
    addOverlay();
  };
}

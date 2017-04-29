function AnimatedTimelineController($timeout) {
  var c = this;

  c.$onInit = function() {
    activateNext(c.data.items);
  };

  function activateNext(items) {
    if (typeof(c.itemActivated) === 'undefined') {
      c.itemActivated = -1;
    }
    c.itemActivated++;
    $timeout(function() {
      items[c.itemActivated].completed = true;
      if (c.itemActivated < items.length) {
        if (!items[c.itemActivated].end) {
          activateNext(items);
        }
      }
    }, items[c.itemActivated].delay * 1000);
  }
}
function AnimatedTimelineController($timeout) {
  var c = this;

  if (c.data.interval) {
    $timeout.cancel(c.data.interval);
    c.data.items.forEach(function(item) {
      item.completed = false;
    });
    c.data.completed = false;
  }

  activateNext(c.data.items);

  function activateNext(items) {
    if (typeof(c.itemActivated) === 'undefined')
      c.itemActivated = -1;
    c.itemActivated++;

    c.data.interval = $timeout(function() {
      items[c.itemActivated].completed = true;
      if (c.itemActivated < items.length) {
        if (!items[c.itemActivated].end) {
          activateNext(items);
        } else {
          group.end = true;
        }
      } else {
        group.end = true;
      }
    }, items[c.itemActivated].delay * 1000);
  }
}
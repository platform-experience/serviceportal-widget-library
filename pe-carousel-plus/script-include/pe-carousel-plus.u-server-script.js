var CarouselPlus = Class.create();
CarouselPlus.prototype = {
  initialize: function() {},

  getSlides: function(group) {
    var grSlide = new GlideRecordSecure('u_carousel_plus');
    grSlide.addActiveQuery();
    grSlide.addQuery('u_group', group);
    grSlide.query();
    var slides = [];
    while (grSlide.next()) {
      slides.push({
        background: grSlide.u_background.getDisplayValue(),
        caption: grSlide.u_caption.toString(),
        height: grSlide.u_height.toString(),
        order: grSlide.u_order.toString(),
        url: grSlide.u_url.toString(),
        youTubeId: grSlide.u_youtube_id.toString()
      });
    }
    return slides;
  },

  type: 'CarouselPlus'
};

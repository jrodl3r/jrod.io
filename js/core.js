//
// Core Application/JS Logic
//
// ==========================================================================

var Modal = {
  container: $('.modal'),
  heading: $('.modal h4'),
  close: $('.modal .close')
};

var Gallery = {
  tiles: $('.work .tile'),

  Init: function() {
    // console.log('Initialize Gallery');

    Gallery.tiles.bind('click', function() {
      Modal.heading.html('Modal #' + ($(this).index() + 1));
      Modal.container.fadeIn(1000);
    });

    Modal.close.bind('click', function() {
      Modal.container.fadeOut(1000);
    });
  }
};

var Core = {
  Init: function() {
    // console.log('Initialize Core');

    Gallery.Init();
  }
};

$(document).ready( function() {
  Core.Init();
});

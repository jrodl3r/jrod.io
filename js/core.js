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
    log('Initialize Gallery');
    Gallery.tiles.bind('click', function() {
      log('Modal #' + ($(this).index() + 1));
      Modal.container.fadeIn(1000);
    });

    Modal.close.bind('click', function() {
      Modal.container.fadeOut(1000);
    });
  }
};

var Core = {
  Init: function() {
    log('Initialize Core');
    Gallery.Init();
  }
};

$(document).ready( function() {
  Core.Init();
});

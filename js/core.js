//
// Core Application/JS Logic
//
// ==========================================================================

var Modal = {
  container: $('.modal'),
  heading: $('.modal h4'),
  closeButton: $('.modal a.close')
};

var Gallery = {
  items: $('.work a.item'),

  Init: function() {
    // console.log('Initialize Gallery');

    Gallery.items.click( function() {
      Modal.heading.html('Modal #' + ($(this).index() + 1));
      Modal.container.fadeIn(1000);
    });

    Modal.closeButton.click( function() {
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

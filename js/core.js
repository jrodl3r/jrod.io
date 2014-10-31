//
// Core Application/JS Logic
//
// ==========================================================================
debug = true;

var Modal = {
  container: $('.modal'),
  heading: $('.modal h4'),
  close: $('.modal .close')
};

var Gallery = {
  tiles: $('.work .tile'),

  Init: function() {
    // log('Initialize Gallery');

    // Bind Click-Event to Tiles
    Gallery.tiles.each(function() {
      //  Avoid 'placeholder' Tiles
      if(!$(this).hasClass('placeholder')) {
        $(this).bind('click', function() {
          // Fade-In Tile's Modal Content
          Modal.container.eq($(this).index()).fadeIn(1000);
        });
      }
    });



    // Bind Click-Event to Modal Close-Buttons
    Modal.close.bind('click', function() {
      $(this).parent().fadeOut(700);
    });
  }
};

var Core = {
  Init: function() {
    // log('Initialize Core');
    Gallery.Init();
  }
};

$(document).ready( function() {
  Core.Init();
});

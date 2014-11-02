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

var Breakpoint = {
  Init: function() {
    // Landscape Breakpoint Logic
    Breakpoints.on({
      name: "bp-landscape",
      matched: function(){ log('bp-landscape ON'); },
      exit: function(){ log('bp-landscape OFF'); },
    });
    // Tablet Breakpoint Logic
    // Breakpoints.on({
    //   name: "bp-tablet",
    //   matched: function(){ log('bp-tablet ON'); },
    //   exit: function(){ log('bp-tablet OFF'); },
    // });
    // Medium Breakpoint Logic
    // Breakpoints.on({
    //   name: "bp-medium",
    //   matched: function(){ log('bp-medium ON'); },
    //   exit: function(){ log('bp-medium OFF'); },
    // });
    // Default Breakpoint Logic
    // Breakpoints.on({
    //   name: "bp-default",
    //   matched: function(){ log('bp-default ON'); },
    //   exit: function(){ log('bp-default OFF'); },
    // });
    // Large Breakpoint Logic
    // Breakpoints.on({
    //   name: "bp-large",
    //   matched: function(){ log('bp-large ON'); },
    //   exit: function(){ log('bp-large OFF'); },
    // });
  }
};

var Core = {
  Init: function() {
    // log('Initialize Core');
    Gallery.Init();
    Breakpoint.Init();
  }
};

$(document).ready( function() {
  Core.Init();
});

//
// Core Application/JS Logic
//
// ==========================================================================
debug = true;

// Work: Modal Display
// --------------------------------------------------------------------------
var Modal = {
  container: $('.modal'),
  heading: $('.modal h4'),
  close: $('.modal .close'),

  // Setup Modals
  init: function() {

    // Add Click/Tap: Close Buttons
    this.close.bind('click', function() {
      $(this).parent().fadeOut(700);
    });
  },

  // Fade-In Modal Window
  show: function(index) {
    this.container.eq(index).fadeIn(1000);
  }
};

// Work: Gallery Slider
// --------------------------------------------------------------------------
var Gallery = {
  container: $('.work .gallery'),
  slider: $('.work .slider'),
  tiles: $('.work .tile'),
  frame_height: 0,

  // Setup Gallery
  init: function() {

    // Setup Pagination
    this.Paging.init();

    // Add Click/Tap: Tiles
    this.tiles.each(function() {

      //  Except 'placeholder' Tiles
      if(!$(this).hasClass('placeholder')) {
        $(this).bind('click', function() {
          // Fade-In Modal Content
          Modal.show($(this).index());
        });
      }
    });
  },

  // Get Gallery Container Height
  getFrameHeight: function() {
    return this.frame_height = parseInt(this.container.css('height'), 10);
  },

  // Get Tile Spacing Height
  getTileSpacing: function() {
    return this.frame_height = parseInt(this.tiles.css('margin-bottom'), 10);
  },

  // Update Slider Poisition
  moveSlider: function(index) {

    // Fade-Out Gallery & Move Slider
    this.container.fadeOut(500, function() {
      if(index) {
        Gallery.slider.css('top', -1 * ((index * Gallery.getFrameHeight()) + (index * Gallery.getTileSpacing())));
      } else {
        Gallery.slider.css('top', 0);
      }
    });

    // Update Paging Buttons & Fade-In Gallery
    this.Paging.update(index);
    this.container.fadeIn(500);
  },

  // Reset Gallery Position
  reset: function() {
    this.slider.css('top', 0);
    this.Paging.update(0);
  },


  // Gallery: Pagination
  // ------------------------------------------------------------------------
  Paging: {
    buttons: $('.pagination div'),
    num_pages: 4,
    active_page: 0,

    // Setup Pagination
    init: function() {

      // Add Click/Tap: Paging Buttons
      this.buttons.each(function() {
        $(this).bind('click', function() {

          // Update Slider Position
          Gallery.moveSlider($(this).index());
        });
      });
    },

    // Set Active Paging Button
    update: function(index) {
      this.buttons.removeClass('active');
      this.buttons.eq(index).addClass('active');
    }
  }
};

// JS-Breakpoints
// --------------------------------------------------------------------------
var Breakpoint = {
  init: function() {

    // Portrait (360px)
    Breakpoints.on({
      name: "bp-portrait",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });

    // Landscape (560px)
    Breakpoints.on({
      name: "bp-landscape",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });

    // Tablet (600px)
    Breakpoints.on({
      name: "bp-tablet",
      matched: function(){
        Gallery.reset();
        Gallery.Paging.num_pages = 1;
      },
      exit: function(){
        Gallery.reset();
        Gallery.Paging.num_pages = 4;
      }
    });

    // Medium (780px)
    Breakpoints.on({
      name: "bp-medium",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });

    // Default (960px)
    Breakpoints.on({
      name: "bp-default",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });

    // Large (1080px)
    Breakpoints.on({
      name: "bp-large",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){}
    });
  }
};

// Core Initialization Object
// --------------------------------------------------------------------------
var Core = {
  init: function() {
    Gallery.init();
    Modal.init();
    Breakpoint.init();
  }
};

// Load Core
// --------------------------------------------------------------------------
$(document).ready( function() {
  Core.init();
});

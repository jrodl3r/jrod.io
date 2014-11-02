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
  container: $('.work .gallery'),
  slider: $('.work .slider'),
  tiles: $('.work .tile'),
  frame_height: 0,

  Init: function() {
    // log('Initialize Gallery');
    // Init Gallery Paging
    Gallery.Paging.Init();

    // Bind Click-Event to Tiles
    Gallery.tiles.each(function() {
      //  Except 'placeholder' Tiles
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
  },

  // Get Current Gallery Frame Height
  getFrameHeight: function() {
    return this.frame_height = parseInt(this.container.css('height'), 10);
  },

  // Get Current Tile Spacing-Margin
  getTileSpacing: function() {
    return this.frame_height = parseInt(this.tiles.css('margin-bottom'), 10);
  },

  // Set/Update Slider Poisition
  setPosition: function(index) {
    if(index !== 0) {
      this.slider.css('top', -1 * ((index * this.getFrameHeight()) + (index * this.getTileSpacing())));
    } else {
      this.slider.css('top', 0);
    }
    this.Paging.setActiveButton(index);
  },

  Paging: {
    buttons: $('.pagination div'),
    num_pages: 4,
    active_page: 0,

    Init: function() {
      // Bind Click-Event to Buttons
      this.buttons.each(function() {
        $(this).bind('click', function() {
          // Update Gallery Position
          Gallery.setPosition($(this).index());
          //log($(this).index() + ' * ' + Gallery.getFrameHeight() + ' + (' + $(this).index() + ' * ' + Gallery.getTileSpacing() + ') = ' + (Gallery.getFrameHeight() + ($(this).index() * Gallery.getTileSpacing())));
        });
      });
    },

    setActiveButton: function(index) {
      this.buttons.removeClass('active');
      this.buttons.eq(index).addClass('active');
    }
  }
};

var Breakpoint = {
  Init: function() {
    // Portrait Breakpoint
    Breakpoints.on({
      name: "bp-portrait",
      matched: function(){
        Gallery.setPosition(0);
      },
      exit: function(){
        Gallery.setPosition(0);
      }
    });
    // Landscape Breakpoint
    Breakpoints.on({
      name: "bp-landscape",
      matched: function(){
        Gallery.setPosition(0);
      },
      exit: function(){
        Gallery.setPosition(0);
      }
    });
    // Tablet Breakpoint
    Breakpoints.on({
      name: "bp-tablet",
      matched: function(){
        Gallery.setPosition(0);
        Gallery.Paging.num_pages = 1;
      },
      exit: function(){
        Gallery.setPosition(0);
        Gallery.Paging.num_pages = 4;
      }
    });
    // Medium Breakpoint
    Breakpoints.on({
      name: "bp-medium",
      matched: function(){
        Gallery.setPosition(0);
      },
      exit: function(){
        Gallery.setPosition(0);
      }
    });
    // Default Breakpoint
    Breakpoints.on({
      name: "bp-default",
      matched: function(){
        Gallery.setPosition(0);
      },
      exit: function(){
        Gallery.setPosition(0);
      }
    });
    // Large Breakpoint
    Breakpoints.on({
      name: "bp-large",
      matched: function(){
        Gallery.setPosition(0);
      },
      exit: function(){}
    });
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

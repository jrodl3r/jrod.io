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
    // Fade-Out Gallery + Update Paging Position
    this.container.fadeOut(500, function() {
      if(index) {
        Gallery.slider.css('top', -1 * ((index * Gallery.getFrameHeight()) + (index * Gallery.getTileSpacing())));
      } else {
        Gallery.slider.css('top', 0);
      }
    });
    // Fade-Back-In Gallery + Update Active Paging Button
    this.container.fadeIn(500);
    this.Paging.setActiveButton(index);
  },

  // Reset Slider to Default Position
  reset: function() {
    this.slider.css('top', 0);
    this.Paging.setActiveButton(0);
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
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });
    // Landscape Breakpoint
    Breakpoints.on({
      name: "bp-landscape",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });
    // Tablet Breakpoint
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
    // Medium Breakpoint
    Breakpoints.on({
      name: "bp-medium",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });
    // Default Breakpoint
    Breakpoints.on({
      name: "bp-default",
      matched: function(){
        Gallery.reset();
      },
      exit: function(){
        Gallery.reset();
      }
    });
    // Large Breakpoint
    Breakpoints.on({
      name: "bp-large",
      matched: function(){
        Gallery.reset();
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

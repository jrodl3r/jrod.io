//
// Jrod.io ~ Application Logic
//
// ==========================================================================
//debug = true;

// Gallery Slider
// --------------------------------------------------------------------------
var Gallery = {

  container: $('.work .gallery'),
  slider: $('.work .slider'),
  tiles: $('.work .tile'),
  frame_height: 0,

  // Init Work Gallery
  init: function() {

    // Setup Pagination
    this.Paging.init();

    // Setup Interactions
    this.setBindings();
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

  // Setup Interactions
  setBindings: function() {

    // Click|Tap: Tiles
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


  // Gallery Pagination
  // ------------------------------------------------------------------------
  Paging: {

    buttons: $('.pagination div'),
    num_pages: 4,
    active_page: 0, // TODO: Add paging-memory

    // Init Pagination
    init: function() {

      // Setup Interactions
      this.setBindings();
    },

    // Set Active Paging Button
    update: function(index) {

      this.buttons.removeClass('active');
      this.buttons.eq(index).addClass('active');
    },

    // Setup Interactions
    setBindings: function() {

      // Click|Tap: Paging Buttons
      this.buttons.each(function() {
        $(this).bind('click', function() {
          Gallery.moveSlider($(this).index());
        });
      });
    }
  }
};


// Work Modal
// --------------------------------------------------------------------------
var Modal = {

  container: $('.modal'),
  heading: $('.modal h4'),
  close: $('.modal .close'),
  samples: $('.modal .sample img'),
  preview: $('.stage img'),
  stage: $('.stage'), // TODO: Create descendent object

  // Init Modal + Preview Stage
  init: function() {

    // Setup Interactions
    this.setBindings();
  },

  // Fade-In Modal Window
  show: function(index) {

    $('body').addClass('noscroll');
    this.container.eq(index).fadeIn(700);
  },

  // Fade-Out Modal Window
  hide: function(modal) {

    $('body').removeClass('noscroll');
    modal.fadeOut(700);
  },

  // Fade-In Stage Preview & Update Image
  showStage: function(source) {

    this.preview.attr('src', source.replace('-small', ''));
    this.stage.fadeIn(700);
  },

  // Fade-Out Stage Preview & Remove Image
  hideStage: function() {

    this.stage.fadeOut(700);
    this.preview.attr('src', '');
  },

  // Setup Interactions
  setBindings: function() {

    // Click|Tap: Close Buttons
    this.close.bind('click', function() {
      Modal.hide($(this).parent());
    });

    // Click|Tap: Samples
    this.samples.bind('click', function() {
      Modal.showStage($(this).attr('src'));
    });

    // Click|Tap: Stage
    this.stage.bind('click', function() {
      Modal.hideStage();
    });

    // Click|Tap: Stage Preview
    this.preview.bind('click', function() {
      Modal.hideStage();
    });
  }
};


// Contact Form
// --------------------------------------------------------------------------
var Connect = {

  ajax_form: $('#contact'),
  name_input: $('input.name'),
  email_input: $('input.email'),
  message_input: $('textarea.message'),
  notify_message: $('.notify'),
  form_data: {},

  // Init Contact Form
  init: function() {

    // Setup Interactions
    this.setBindings();

    // Validate & Submit
    this.process();
  },


  // Validate Input
  validate: function() {

    // Verify Name
    if(this.name_input.val() === 'Name' || this.name_input.val() === '') {
      this.notify('Forget to add your name?', 'bad');
      this.name_input.focus();
      return false;
    }

    // Verify Email
    if(this.email_input.val() === 'Email' || this.email_input.val() === '') {
      this.notify('Forget to add your email?', 'bad');
      this.email_input.focus();
      return false;
    }

    // Verify Message
    if(this.message_input.val() === 'Message' || this.message_input.val() === '') {
      this.notify('Forget to add your message?', 'bad');
      this.message_input.focus();
      return false;
    }

    return true;
  },

  // Submit User Message
  process: function() {

    // Submit User Message
    $(this.ajax_form).submit(function(event) {

      // Stop Default Behavior
      event.preventDefault();

      // Validate Input
      if(Connect.validate()) {

        // Serialize Input
        Connect.form_data = $(Connect.ajax_form).serialize();

        // Create Request
        $.ajax({
          type: 'POST',
          url: $(Connect.ajax_form).attr('action'),
          data: Connect.form_data

        // Success
        }).done(function(response) {

          Connect.notify(response, 'good');
          Connect.name_input.val('Name');
          Connect.email_input.val('Email');
          Connect.message_input.val('Message');

        // Failed
        }).fail(function(data) {

          if (data.responseText !== '') {
            Connect.notify(data.responseText, 'bad');
          } else {
            Connect.notify('Oops! An error occured and your message could not be sent.', 'bad');
          }
        });
      }
    });
  },

  // Notify User
  notify: function(message, status) {

    // Set Notification Color
    if (status === 'good') {
      Connect.notify_message.addClass('good');
    } else if (status === 'bad') {
      Connect.notify_message.addClass('bad');
    }

    // Inject Message & Fade-In
    Connect.notify_message.html(message);
    Connect.notify_message.fadeIn(700);

    // Fade-Out After 3sec
    setTimeout(function() {
      Connect.notify_message.fadeOut(700, function(){
        Connect.notify_message.removeClass('good bad');
      });
    }, 3000);
  },

  // Setup Interactions
  setBindings: function() {

    // Focus|Blur: Name Field
    this.name_input.bind('focus', function() {
      if($(this).val() === 'Name') {
        $(this).val('');
      }
    });
    this.name_input.bind('blur', function() {
      if(!$(this).val().trim()) {
        $(this).val('Name');
      }
    });

    // Focus|Blur: Email Field
    this.email_input.bind('focus', function() {
      if($(this).val() === 'Email') {
        $(this).val('');
      }
    });
    this.email_input.bind('blur', function() {
      if(!$(this).val().trim()) {
        $(this).val('Email');
      }
    });

    // Focus|Blur: Message Field
    this.message_input.bind('focus', function() {
      if($(this).val() === 'Message') {
        $(this).val('');
      }
    });
    this.message_input.bind('blur', function() {
      if(!$(this).val().trim()) {
        $(this).val('Message');
      }
    });
  }
};


// JS-Breakpoints
// --------------------------------------------------------------------------
var Breakpoint = {

  init: function() {

    // Portrait (360px)
    Breakpoints.on({
      name: "bp-portrait",
      matched: function() {
        Gallery.reset();
      },
      exit: function() {
        Gallery.reset();
      }
    });

    // Landscape (560px)
    Breakpoints.on({
      name: "bp-landscape",
      matched: function() {
        Gallery.reset();
      },
      exit: function() {
        Gallery.reset();
      }
    });

    // Tablet (600px)
    Breakpoints.on({
      name: "bp-tablet",
      matched: function() {
        Gallery.reset();
        Gallery.Paging.num_pages = 1;
      },
      exit: function() {
        Gallery.reset();
        Gallery.Paging.num_pages = 4;
      }
    });

    // Medium (780px)
    Breakpoints.on({
      name: "bp-medium",
      matched: function() {
        Gallery.reset();
      },
      exit: function() {
        Gallery.reset();
      }
    });

    // Default (960px)
    Breakpoints.on({
      name: "bp-default",
      matched: function() {
        Gallery.reset();
      },
      exit: function() {
        Gallery.reset();
      }
    });

    // Large (1080px)
    Breakpoints.on({
      name: "bp-large",
      matched: function() {
        Gallery.reset();
      },
      exit: function() {

      }
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
    Connect.init();
  }
};


// Load Core
// --------------------------------------------------------------------------
$(document).ready( function() {

  Core.init();

});

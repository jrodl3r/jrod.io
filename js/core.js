//
// Application Logic
//
// ==========================================================================
// debug = true;

// Gallery Slider
// --------------------------------------------------------------------------
var Gallery = {

  container: $('.work .gallery'),
  slider: $('.work .slider'),
  tiles: $('.work .tile'),
  frame_height: 0,


  init: function() {

    // Setup Pagination
    this.Paging.init();

    // Setup Interactions
    this.interact();
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
  interact: function() {

    // Click|Tap: Tiles
    this.tiles.each(function() {

      //  Except 'placeholder' Tiles
      if(!$(this).hasClass('placeholder')) {
        $(this).on('click', function() {

          // Fade-In Modal Content & Disable Mobile Zooming
          Modal.show($(this).index());
          Modal.disableZoom();
        });
      }
    });
  },


  // Gallery Pagination
  // ------------------------------------------------------------------------
  Paging: {

    buttons: $('.pagination div'),
    num_pages: 4,


    init: function() {

      // Setup Interactions
      this.interact();
    },

    // Set Active Paging Button
    update: function(index) {

      this.buttons.removeClass('active');
      this.buttons.eq(index).addClass('active');
    },

    // Setup Interactions
    interact: function() {

      // Click|Tap: Paging Buttons
      this.buttons.each(function() {
        $(this).on('click', function() {
          Gallery.moveSlider($(this).index());
        });
      });
    }
  }
};


// Project Modals
// --------------------------------------------------------------------------
var Modal = {

  container: $('.modal'),
  close: $('.modal .close'),
  samples: $('.modal .sample img'),


  init: function() {

    // Setup Preview Stage
    this.Stage.init();

    // Setup Interactions
    this.interact();
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

  // Content Zooming On
  enableZoom: function() {

    $('head meta[name=viewport]').remove();
    $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1" />');
  },

  // Content Zooming Off
  disableZoom: function() {

    $('head meta[name=viewport]').remove();
    $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />');
  },

  // Setup Interactions
  interact: function() {

    // Click|Tap: Close Buttons
    this.close.on('click', function() {
      Modal.hide($(this).parent());
      Modal.enableZoom();
    });

    // Click|Tap: Samples
    this.samples.on('click', function() {
      Modal.Stage.show($(this).attr('src'));
    });
  },


  // Sample Preview Stage
  // ------------------------------------------------------------------------
  Stage: {

    container: $('.stage'),
    preview: $('.stage img'),
    close: $('.stage .close'),


    init: function() {

      // Setup Interactions
      this.interact();
    },

    // Fade-In Stage & Update Image
    show: function(source) {

      this.preview.attr('src', source.replace('-small', ''));
      this.container.fadeIn(700);
    },

    // Fade-Out Stage & Remove Image
    hide: function() {

      this.container.fadeOut(700);
      this.preview.attr('src', '');
    },

    // Setup Interactions
    interact: function() {

      // Click|Tap: Stage
      this.container.on('click', function() {
        Modal.Stage.hide();
      });

      // Click|Tap: Stage Preview
      this.preview.on('click', function() {
        Modal.Stage.hide();
      });

      // Click|Tap: Close Buttons
      this.close.on('click', function() {
        Modal.Stage.hide();
      });
    }
  }
};


// Contact Form
// --------------------------------------------------------------------------
var Contact = {

  ajax_form: $('#contact'),
  name_input: $('input.name'),
  email_input: $('input.email'),
  message_input: $('textarea.message'),
  submit_button: $('button[type=submit]'),
  notify_message: $('.notify'),
  form_data: {},


  init: function() {

    // Setup Interactions
    this.interact();

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
      if(Contact.validate()) {

        // Disable While Submitting
        Contact.disable();

        // Serialize Input
        Contact.form_data = $(Contact.ajax_form).serialize();

        // Create Request
        $.ajax({
          type: 'POST',
          url: $(Contact.ajax_form).attr('action'),
          data: Contact.form_data

        // Message Sent
        }).done(function(response) {

          Contact.notify(response, 'good');
          Contact.reset();

        // Failed
        }).fail(function(data) {

          if (data.responseText !== '') {
            Contact.notify(data.responseText, 'bad');
          } else {
            Contact.notify('Oops! An error occured and your message could not be sent.', 'bad');
          }
        });
      }
    });
  },

  // Enable Submit Button
  enable: function() {

    this.submit_button.removeAttr('disabled');
  },

  // Disable Submit Button
  disable: function() {

    this.submit_button.attr('disabled', 'disabled');
  },

  // Clear User Input & Reset Default Labels
  reset: function() {

    Contact.name_input.val('Name');
    Contact.email_input.val('Email');
    Contact.message_input.val('Message');
  },

  // Notify User
  notify: function(message, status) {

    // Temporarily Disable
    this.disable();

    // Set Notification Color
    if (status === 'good') {
      this.notify_message.addClass('good');
    } else if (status === 'bad') {
      this.notify_message.addClass('bad');
    }

    // Inject Message & Fade-In
    this.notify_message.html(message);
    this.notify_message.fadeIn(700);

    // Fade-Out & Re-enable After 3sec
    setTimeout(function() {
      Contact.notify_message.fadeOut(700, function(){
        Contact.notify_message.removeClass('good bad');
        Contact.enable();
      });
    }, 3000);
  },

  // Setup Interactions
  interact: function() {

    // Focus|Blur: Name Field
    this.name_input.on('focus', function() {
      if($(this).val() === 'Name') {
        $(this).val('');
      }
    });

    this.name_input.on('blur', function() {
      if(!$(this).val().trim()) {
        $(this).val('Name');
      }
    });

    // Focus|Blur: Email Field
    this.email_input.on('focus', function() {
      if($(this).val() === 'Email') {
        $(this).val('');
      }
    });

    this.email_input.on('blur', function() {
      if(!$(this).val().trim()) {
        $(this).val('Email');
      }
    });

    // Focus|Blur: Message Field
    this.message_input.on('focus', function() {
      if($(this).val() === 'Message') {
        $(this).val('');
      }
    });

    this.message_input.on('blur', function() {
      if(!$(this).val().trim()) {
        $(this).val('Message');
      }
    });
  }
};


// Parallax Scroll Effects
// --------------------------------------------------------------------------
var Parallax = {

  enabled: true,
  header: $('header'),
  header_height: 0,


  init: function() {

    // Update Dimensions
    this.update();

    // Setup Interactions
    this.interact();
  },

  // Update Dimensions
  update: function() {

    this.header_height = $('header').outerHeight();
  },

  // Animate Content
  animate: function() {

    Parallax.header.css('height', Parallax.header_height - window.scrollY + 'px');
  },

  // Reset & Update Dimensions
  resize: function() {

    Parallax.header.css('height', 'auto');
    Parallax.update();
  },

  // Setup Interactions
  interact: function() {

    // Mobile: Disable Parallax
    if(!Modernizr.touch) {

      // Scroll: Animate Content
      $(window).scroll(function() {
        window.requestAnimationFrame(Parallax.animate);
      });

      // Resize: Update Dimensions
      $(window).resize(function() {
        window.requestAnimationFrame(Parallax.resize);
      });
    }
  }
};


// Browser Sniffing
// --------------------------------------------------------------------------
var Browsers = {

  init: function() {

    // Kill Micro$oft
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0 || navigator.userAgent.match(/iemobile/i)) {
      $('.site').html('<p style="padding-top: 40px; text-align: center;">IE is currently unsupported! Please use <i>[insert name of any other browser]</i> for the best experience while viewing my site. Thx!</p>');
      $('footer').css('display', 'none');
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

    // Large (1020px)
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


// Core Initialization
// --------------------------------------------------------------------------
var Core = {

  init: function() {

    Gallery.init();
    Modal.init();
    Contact.init();
    Parallax.init();
    Breakpoint.init();
    Browsers.init();
  }
};

$(document).ready(function() {
  Core.init();
});

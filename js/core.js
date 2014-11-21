//
// Core Application Logic
//
// ==========================================================================
//debug = true;


// Base Application Object
// --------------------------------------------------------------------------
var App = {

  // Visual Effects
  // ------------------------------------------------------------------------
  Fx: {

    enabled: true,
    site: $('.site'),
    footer: $('footer'),
    header: $('header'),
    header_height: 0,


    init: function() {

      // Update Dimensions
      this.update();

      // Setup Interactions
      this.interact();
    },

    // Load Content
    load: function() {

      setTimeout(function() {
        App.Fx.site.css('visibility', 'visible');
        App.Fx.footer.css('visibility', 'visible');
        //window.scrollTo(0, 0);
      }, 0);
    },

    // Update Dimensions
    update: function() {

      this.header_height = $('header').outerHeight();
    },

    // Animate Content
    animate: function() {

      if(App.Fx.header_height - window.scrollY > $('body').scrollTop()) {
        App.Fx.header.css('height', App.Fx.header_height - window.scrollY + 'px');
      }
    },

    // Reset & Update Dimensions
    resize: function() {

      //window.scrollTo(0, 0);
      App.Fx.header.css('height', 'auto');
      App.Fx.update();
    },

    // Setup Interactions
    interact: function() {

      // Mobile: Disable Parallax
      if(!Modernizr.touch) {

        // Scroll: Animate Content
        $(window).scroll(function() {

          window.requestAnimationFrame(App.Fx.animate);
        });

        // Resize: Update Dimensions
        $(window).resize(function() {

          window.requestAnimationFrame(App.Fx.resize);
        });
      }
    }
  },


  // Gallery Slider
  // ------------------------------------------------------------------------
  Gallery: {

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
          App.Gallery.slider.css('top', -1 * ((index * App.Gallery.getFrameHeight()) + (index * App.Gallery.getTileSpacing())));
        } else {
          App.Gallery.slider.css('top', 0);
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
            App.Modal.show($(this).index());
            App.Modal.disableZoom();
          });
        }
      });
    },


    // Gallery Pagination
    // ----------------------------------------------------------------------
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
            App.Gallery.moveSlider($(this).index());
          });
        });
      }
    }
  },


  // Project Modals
  // ------------------------------------------------------------------------
  Modal: {

    container: $('.modal'),
    close: $('.modal .close'),
    samples: $('.modal .sample img'),
    previews_loaded: false,

    init: function() {

      // Setup Preview Stage
      this.Stage.init();

      // Setup Interactions
      this.interact();
    },

    // Fade-In Modal Window
    show: function(index) {

      if(!this.previews_loaded) {
        this.loadPreviews();
      }
      this.disableScrolling();
      this.container.eq(index).fadeIn(700);
    },

    // Fade-Out Modal Window
    hide: function(modal) {

      this.enableScrolling();
      modal.fadeOut(700);
    },

    // Lazy-Load Modal Samples
    loadPreviews: function() {

      this.samples.each(function() {
        $(this).attr('src', $(this).attr('data-src'));
      });
      this.previews_loaded = true;
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

    // Content Scrolling On
    enableScrolling: function() {

      $('body').removeClass('noscroll');
    },

    // Content Scrolling Off
    disableScrolling: function() {

      $('body').addClass('noscroll');
    },

    // Setup Interactions
    interact: function() {

      // Click|Tap: Close Buttons
      this.close.on('click', function() {
        App.Modal.hide($(this).parent());
        App.Modal.enableZoom();
      });

      // Click|Tap: Samples
      this.samples.on('click', function() {
        App.Modal.Stage.show($(this).attr('src'));
      });
    },


    // Sample Preview Stage
    // ----------------------------------------------------------------------
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
          App.Modal.Stage.hide();
        });

        // Click|Tap: Stage Preview
        this.preview.on('click', function() {
          App.Modal.Stage.hide();
        });

        // Click|Tap: Close Buttons
        this.close.on('click', function() {
          App.Modal.Stage.hide();
        });
      }
    }
  },


  // Contact Form
  // ------------------------------------------------------------------------
  Contact: {

    ajax_form: $('#contact'),
    name_input: $('input.name'),
    email_input: $('input.email'),
    message_input: $('textarea.message'),
    submit_button: $('button[type=submit]'),
    notify_box: $('.notify'),
    notify_message: $('.notify .inner'),
    form_data: {},


    init: function() {

      // Setup Interactions
      this.interact();

      // Validation & Submission
      this.process();
    },

    // Validate Input
    validate: function() {

      var status = true;

      // Verify Name
      if(this.name_input.val() === 'Name' || this.name_input.val() === '') {
        this.notify('Forget to add your name?', 'bad');
        this.name_input.focus();
        status = false;
      }

      // Verify Email
      else if(this.email_input.val() === 'Email' || this.email_input.val() === '') {
        this.notify('Forget to add your email?', 'bad');
        this.email_input.focus();
        status = false;
      }

      // Validate Email
      else if(/^.+@.+\..+$/.test(this.email_input.val()) === false) {
        this.notify('Did you mistype your email?', 'bad');
        this.email_input.focus();
        status = false;
      }

      // Verify Message
      else if(this.message_input.val() === 'Message' || this.message_input.val() === '') {
        this.notify('Forget to add your message?', 'bad');
        this.message_input.focus();
        status = false;
      }

      return status;
    },

    // Submit User Message
    process: function() {

      // Submit User Message
      $(this.ajax_form).submit(function(event) {

        // Stop Default Behavior
        event.preventDefault();

        // Validate Input
        if(App.Contact.validate()) {

          // Disable While Submitting
          App.Contact.disable();

          // Update Submit Button Label
          App.Contact.updateButton(true);

          // Serialize Input
          App.Contact.form_data = $(App.Contact.ajax_form).serialize();

          // Create Request
          $.ajax({
            type: 'POST',
            url: $(App.Contact.ajax_form).attr('action'),
            data: App.Contact.form_data

          // Message Sent
          }).done(function(response) {

            App.Contact.notify(response, 'good');
            App.Contact.updateButton();
            App.Contact.reset();

          // Failed
          }).fail(function(data) {

            if (data.responseText !== '') {
              App.Contact.notify(data.responseText, 'bad');
            } else {
              App.Contact.notify('Oops! An error occured and your message could not be sent.', 'bad');
            }
            App.Contact.updateButton();
          });
        }
      });
    },

    // Notify User
    notify: function(message, status) {

      // Temporarily Disable
      this.disable();

      // Set Notification Color
      if (status === 'good') {
        this.notify_box.addClass('good');
      } else if (status === 'bad') {
        this.notify_box.addClass('bad');
      }

      // Inject Message & Fade-In
      this.notify_message.html(message);
      this.notify_box.fadeIn(700);

      // Fade-Out & Re-enable After 3sec
      setTimeout(function() {
        App.Contact.notify_box.fadeOut(700, function(){
          App.Contact.notify_box.removeClass('good bad');
          App.Contact.enable();
        });
      }, 3000);
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

      App.Contact.name_input.val('Name');
      App.Contact.email_input.val('Email');
      App.Contact.message_input.val('Message');
    },

    // Update Submit Button Label
    updateButton: function(status) {

      if(status === true) {
        this.submit_button.html('Sending...');
      } else {
        this.submit_button.html('Send');
      }
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
  },


  // Browser-Specific Adjustments
  // ------------------------------------------------------------------------
  Browsers: {

    init: function() {

      // Show IE Warning
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0 || navigator.userAgent.match(/iemobile/i)) {
        $('.site').html('<p style="padding-top: 40px; text-align: center;">The IE version of my site is currently under development.<br>Please use any Webkit browser for the best experience while viewing my site. Thx!</p>');
        $('footer').css('display', 'none');
      }
    }
  },


  // JS-Breakpoints
  // ------------------------------------------------------------------------
  Breakpoint: {

    init: function() {

      // Portrait (360px)
      App.Breakpoints.on({
        name: "bp-portrait",
        matched: function() {
          App.Gallery.reset();
        },
        exit: function() {
          App.Gallery.reset();
        }
      });

      // Landscape (560px)
      App.Breakpoints.on({
        name: "bp-landscape",
        matched: function() {
          App.Gallery.reset();
        },
        exit: function() {
          App.Gallery.reset();
        }
      });

      // Tablet (600px)
      App.Breakpoints.on({
        name: "bp-tablet",
        matched: function() {
          App.Gallery.reset();
          App.Gallery.Paging.num_pages = 1;
        },
        exit: function() {
          App.Gallery.reset();
          App.Gallery.Paging.num_pages = 4;
        }
      });

      // Medium (780px)
      App.Breakpoints.on({
        name: "bp-medium",
        matched: function() {
          App.Gallery.reset();
        },
        exit: function() {
          App.Gallery.reset();
        }
      });

      // Default (960px)
      App.Breakpoints.on({
        name: "bp-default",
        matched: function() {
          App.Gallery.reset();
        },
        exit: function() {
          App.Gallery.reset();
        }
      });

      // Large (1020px)
      App.Breakpoints.on({
        name: "bp-large",
        matched: function() {
          App.Gallery.reset();
        },
        exit: function() {

        }
      });
    }
  }
};


// Load Application
// --------------------------------------------------------------------------

$(document).ready(function() {

  App.Fx.init();
});

$(window).load(function() {

  App.Fx.load();
  App.Gallery.init();
  App.Modal.init();
  App.Contact.init();
  App.Breakpoint.init();
  App.Browsers.init();
});

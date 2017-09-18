//
// Global App Object
//
// ==========================================================================

var App = {

  // Visual Effects
  // ------------------------------------------------------------------------
  Fx: {

    enabled: true,
    header: $('header'),


    init: function() {

      // Setup Interactions
      this.interact();
    },

    // Reset Positions
    reset: function() {

      this.header.css('transform', 'translate3d(0,0,0)');
    },

    // Scroll Animation
    scrollAnim: function() {

      if(window.scrollY < App.Fx.header.outerHeight() && App.Fx.enabled) {
        App.Fx.header.css('transform', 'translate3d(0,' + (window.scrollY/2) + 'px,0)');
      }
    },

    // Enable Animations
    enable: function() {

      this.enabled = true;
    },

    // Disable Animations
    disable: function() {

      this.reset();
      this.enabled = false;
    },

    // Setup Interactions
    interact: function() {

      // Disable Parallax (unless Desktop Chrome Browser)
      if(!Modernizr.touch && App.Fx.enabled && App.Browsers.is_chrome) {

        // Scroll: Animate Content
        $(window).scroll(function() { window.requestAnimationFrame(App.Fx.scrollAnim); });
      }
    }
  },


  // Gallery Slider
  // ------------------------------------------------------------------------
  Gallery: {

    container: $('.work .gallery'),
    slider: $('.work .slider'),
    tiles: $('.work .tile'),


    init: function() {

      // Setup Pagination
      this.Paging.init();

      // Setup Interactions
      this.interact();
    },

    // Get Gallery Container Height
    getFrameHeight: function() {

      return parseInt(this.container.css('height'), 10);
    },

    // Get Tile Spacing Height
    getTileSpacing: function() {

      return parseInt(this.tiles.css('margin-bottom'), 10);
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

      // Click|Tap: Open Modal & Lazy-Load Stage Samples
      this.tiles.not('.placeholder').on('click', function() {
        App.Modal.show($(this).index());
        App.Modal.Stage.loadPreviews($(this).index());
      });

      // Hover: Lazy-Load Modal Samples
      this.tiles.not('.placeholder').on('mouseover', function() {
        App.Modal.loadSamples($(this).index());
      });

      // Scroll: Lazy-Load All Modal Samples
      if(Modernizr.touch) {
        $(window).scroll(function() {
          if(!App.Modal.loaded && window.scrollY > App.Fx.header.outerHeight()) {
            App.Modal.loadSamples('all');
          }
        });
      }
    },


    // Gallery Pagination
    // ----------------------------------------------------------------------
    Paging: {

      buttons: $('.pagination div'),


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
    status: [0, 0, 0, 0, 0, 0, 0, 0],
    loaded: false,


    init: function() {

      // Setup Preview Stage
      this.Stage.init();

      // Setup Interactions
      this.interact();
    },

    // Fade-In Modal Window
    show: function(index) {

      this.disableScrolling();
      this.container.eq(index).addClass('active open');
    },

    // Fade-Out Modal Window
    hide: function() {

      $('.modal.active').removeClass('active');
      setTimeout(function() {
        $('.modal.open').removeClass('open');
        App.Modal.enableScrolling();
      }, 400);
    },

    // Lazy-Load Modal Samples
    loadSamples: function(index) {

      // Load All Samples (Mobile|Scroll)
      if (index === 'all') {
        this.samples.each(function() {
          $(this).attr('src', $(this).attr('data-src'));
        });
        this.status = [1, 1, 1, 1, 1, 1, 1, 1];
        this.loaded = true;

      // Individually Load Samples (Desktop|Hover)
      } else if (!this.status[index]) {
        this.container.eq(index).find('.sample img').each(function() {
          $(this).attr('src', $(this).attr('data-src'));
        });
        this.status[index] = true;
      }
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

      // Click|Tap: Close Button
      this.close.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        App.Modal.hide();
      });

      // Click|Tap: Samples
      this.samples.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        App.Modal.Stage.show($(this).attr('src'));
      });
    },


    // Sample Preview Stage
    // ----------------------------------------------------------------------
    Stage: {

      container: $('.stage'),
      close: $('.stage .close'),
      preview: $('.stage img'),
      cache: [],
      count: 0,
      status: [0, 0, 0, 0, 0, 0, 0, 0],
      source: [
        ['img/projects/target/samples/sample-01.jpg',
         'img/projects/target/samples/sample-02.jpg',
         'img/projects/target/samples/sample-03.jpg'],
        ['img/projects/ge/samples/sample-01.jpg',
         'img/projects/ge/samples/sample-02.jpg',
         'img/projects/ge/samples/sample-03.jpg'],
        ['img/projects/360i/samples/sample-01.jpg',
         'img/projects/360i/samples/sample-02.jpg',
         'img/projects/360i/samples/sample-03.jpg'],
        ['img/projects/crown/samples/sample-01.jpg',
         'img/projects/crown/samples/sample-02.jpg'],
        ['img/projects/kraft/samples/sample-01.jpg',
         'img/projects/kraft/samples/sample-02.jpg',
         'img/projects/kraft/samples/sample-03.jpg'],
        ['img/projects/oscarmayer/samples/sample-01.jpg',
         'img/projects/oscarmayer/samples/sample-02.jpg'],
        ['img/projects/yourcare/samples/sample-01.jpg',
         'img/projects/yourcare/samples/sample-02.jpg',
         'img/projects/yourcare/samples/sample-03.jpg'],
        ['img/projects/nylearns/samples/sample-01.jpg',
         'img/projects/nylearns/samples/sample-02.jpg',
         'img/projects/nylearns/samples/sample-03.jpg'],
        ['img/projects/gi/samples/sample-01.jpg',
         'img/projects/gi/samples/sample-02.jpg',
         'img/projects/gi/samples/sample-03.jpg']
      ],


      init: function() {

        // Setup Interactions
        this.interact();
      },

      // Fade-In Stage & Update Image
      show: function(source) {

        this.preview.attr('src', source.replace('-small', ''));
        this.container.addClass('active open');

      },

      // Fade-Out Stage & Remove Image
      hide: function() {

        this.container.removeClass('active');
        setTimeout(function() {
          App.Modal.Stage.container.removeClass('open');
          App.Modal.Stage.container.scrollTop(0);
          App.Modal.Stage.preview.attr('src', 'img/blank.gif');
        }, 400);
      },

      // Lazy-Load Stage Previews
      loadPreviews: function(active) {

        if (!this.status[active]) {
          for (var i = 0; i < this.source[active].length; i++) {
            this.cache[i + this.count] = new Image();
            this.cache[i + this.count].src = this.source[active][i];
          }
          this.count = this.cache.length;
          this.status[active] = true;
        }
      },

      // Setup Interactions
      interact: function() {

        // Click|Tap: Stage + Preview + Close Buttons
        this.container.add(this.preview).add(this.close).on('click', function() {
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
      if(!this.name_input.val().trim()) {
        this.notify('Forget to add your name?', 'bad');
        this.name_input.focus();
        status = false;
      }

      // Verify Email
      else if(!this.email_input.val().trim()) {
        this.notify('Forget to add your email?', 'bad');
        this.email_input.focus();
        status = false;
      }

      // Validate Email
      else if(!/^.+@.+\..+$/.test(this.email_input.val())) {
        this.notify('Did you mistype your email?', 'bad');
        this.email_input.focus();
        status = false;
      }

      // Verify Message
      else if(!this.message_input.val().trim()) {
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

        event.preventDefault();

        // Validate Input
        if(App.Contact.validate()) {

          App.Contact.disable();
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

      App.Contact.name_input.val('').attr('placeholder', 'Name');
      App.Contact.email_input.val('').attr('placeholder', 'Email');
      App.Contact.message_input.val('').attr('placeholder', 'Message');
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
        $(this).attr('placeholder', '');
      });

      this.name_input.on('blur', function() {
        if(!$(this).val().trim()) {
          $(this).attr('placeholder', 'Name');
        }
      });

      // Focus|Blur: Email Field
      this.email_input.on('focus', function() {
        $(this).attr('placeholder', '');
      });

      this.email_input.on('blur', function() {
        if(!$(this).val().trim()) {
          $(this).attr('placeholder', 'Email');
        }
      });

      // Focus|Blur: Message Field
      this.message_input.on('focus', function() {
        $(this).attr('placeholder', '');
      });

      this.message_input.on('blur', function() {
        if(!$(this).val().trim()) {
          $(this).attr('placeholder', 'Message');
        }
      });
    }
  },


  // JS-Breakpoints
  // ------------------------------------------------------------------------
  Breakpoint: {

    init: function() {

      // Portrait (360px)
      Breakpoints.on({
        name: "bp-portrait",
        matched: function() {
          //App.Fx.disable();
        }
      });

      // Landscape (560px)
      Breakpoints.on({
        name: "bp-landscape",
        matched: function() {
          App.Gallery.reset();
          //App.Fx.disable();
        },
        exit: function() {
          App.Gallery.reset();
        }
      });

      // Tablet (600px)
      Breakpoints.on({
        name: "bp-tablet",
        matched: function() {
          App.Gallery.reset();
          //App.Fx.disable();
        },
        exit: function() {
          App.Gallery.reset();
          //App.Fx.disable();
        }
      });

      // Medium (780px)
      Breakpoints.on({
        name: "bp-medium",
        matched: function() {
          App.Gallery.reset();
          //App.Fx.enable();
        },
        exit: function() {
          App.Gallery.reset();
          //App.Fx.disable();
        }
      });

      // Default (960px)
      Breakpoints.on({
        name: "bp-default",
        matched: function() {
          App.Gallery.reset();
          //App.Fx.enable();
        },
        exit: function() {
          App.Gallery.reset();
        }
      });

      // Large (1020px)
      Breakpoints.on({
        name: "bp-large",
        matched: function() {
          App.Gallery.reset();
          //App.Fx.enable();
        },
        exit: function() {}
      });
    }
  },


  // Browser-Specific Adjustments
  // ------------------------------------------------------------------------
  Browsers: {

    is_chrome: false,
    is_ie: false,

    init: function() {

      // Monitor Browsers
      this.detect();

      // Show Coming Soon Message (IE)
      this.disableView();
    },

    // Monitor Browsers
    detect: function() {

      this.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
      this.is_ie = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
    },

    // Show Coming Soon Message (IE)
    disableView: function() {

      if(this.is_ie) {
        $('.site').css('display', 'none');
        $('footer').css('display', 'none');
        $('body').append('<div id="comingsoon">Coming Soon...<br><br>Please Use Chrome/Firefox/Safari</div>');
      }
    }
  }
};


// Load Application
// --------------------------------------------------------------------------

$(document).ready(function() {

  App.Breakpoint.init();
  App.Browsers.init();
  //App.Fx.init();
  App.Gallery.init();
  App.Modal.init();
  App.Contact.init();
});

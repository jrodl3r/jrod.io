/*global module, require*/

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    sass: {
      dev: {
        options: {
          style: 'expanded',
          require: ['susy', 'breakpoint'],
          compass: true
        },
        files: {
          'css/base.css': 'css/base.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          require: ['susy', 'breakpoint'],
          compass: true,
          sourcemap: 'none'
        },
        files: {
          'css/dist.css': 'css/base.scss'
        }
      },
      resume: {
        options: {
          style: 'expanded',
          require: ['susy', 'breakpoint'],
          compass: true
        },
        files: {
          'css/resume.css': 'css/resume.scss'
        }
      }
    },


    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: false,
        browser: true,
        globals: {
          "$": false,
          "jQuery": false,
          "Modernizr": false,
          "console": false,
          "window": true,
          "debug": true,
          "log": true,
          "Breakpoints": true
        }
      },
      files: ['Gruntfile.js', 'js/*.js', '!js/dist*.js']
    },


    uglify: {
      dist: {
        src: ['js/*.js', '!js/dist*.js'],
        dest: 'js/dist.min.js'
      }
    },


    // concat: {
    //   options: {
    //     separator: '',
    //     stripBanners: true
    //   },
    //   dist: {
    //     src: ['js/vendor/modernizr-2.8.0.min.js', 'js/vendor/jquery-1.11.1.min.js', 'js/dist.min.js'],
    //     dest: 'js/dist.js'
    //   }
    // },


    targethtml: {
      dev: {
        files: {
          'index.php': 'tmpl/index.html'
        }
      },
      dist: {
        files: {
          'index.php': 'tmpl/index.html'
        }
      }
    },


    watch: {
      sass: {
        files: ['css/**/*.scss', '!css/resume.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint']
      },
      html: {
        files: 'tmpl/index.html',
        tasks: ['targethtml:dev']
      },
      options: {
        livereload: true
      }
    }

  });


  // Load Modules
  // ----------------------------------------------------------
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-targethtml');


  // Register Tasks
  // ----------------------------------------------------------
  grunt.registerTask('default', ['sass:dev', 'jshint', 'targethtml:dev']);
  grunt.registerTask('dev', ['sass:dev', 'jshint', 'targethtml:dev', 'watch']);
  grunt.registerTask('dist', ['sass:dist', 'jshint', 'uglify', 'targethtml:dist']);
  grunt.registerTask('resume', ['sass:resume']);


  // Show Timer
  // ----------------------------------------------------------
  require('time-grunt')(grunt);

};

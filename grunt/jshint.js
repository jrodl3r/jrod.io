/*global module*/
//
// Grunt - jshint.js
//
// ==========================================================================

module.exports = {
  options: {
    curly: true,
    eqeqeq: true,
    immed: true,
    latedef: true,
    newcap: true,
    noarg: true,
    sub: true,
    undef: true,
    unused: true,
    boss: true,
    eqnull: true,
    browser: true,
    globals: {
      "$": false,
      "jQuery": false,
      "console": false
    }
  },
  gruntfile: {
    src: ['Gruntfile.js', 'grunt/*.js']
  },
  dist: {
    options: {
      ignores: ['js/dist.min.js']
    },
    src: ['js/core.js', 'js/plugins.js']
  }
};
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
    unused: false,
    boss: true,
    eqnull: false,
    browser: true,
    globals: {
      "$": false,
      "jQuery": false,
      "console": false,
      "debug": true,
      "log": true
    }
  },
  gruntfile: {
    src: ['Gruntfile.js', 'grunt/*.js']
  },
  dist: {
    options: {
      ignores: ['js/dist.min.js']
    },
    src: ['js/core.js', 'js/plugins.js', 'js/utils.js']
  }
};

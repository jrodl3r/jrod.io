/*global module*/
//
// Grunt - uglify.js
//
// ==========================================================================

module.exports = {
  dist: {
    src: '<%= jshint.dist.src %>',
    dest: 'js/dist.min.js'
  }
};
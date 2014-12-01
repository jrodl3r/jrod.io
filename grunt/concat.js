/*global module*/
//
// Grunt - concat.js
//
// ==========================================================================

module.exports = {
  options: {
    separator: '',
    stripBanners: true
  },
  dist: {
    src: ['js/vendor/modernizr-2.8.0.min.js', 'js/vendor/jquery-1.11.1.min.js', 'js/dist.min.js'],
    dest: 'js/dist.min.js'
  }
};

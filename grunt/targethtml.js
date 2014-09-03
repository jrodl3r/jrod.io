/*global module*/
//
// Grunt - targethtml.js
//
// ==========================================================================

module.exports = {
  options: {
    curlyTags: {
      name: '<%= package.name %>',
      version: '<%= package.version %>'
    }
  },
  dist: {
    files: {
      'index.html': 'tmpl/index.html'
    }
  },
  dev: {
    files: {
      'index.html': 'tmpl/index.html'
    }
  }
};
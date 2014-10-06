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
      'index.php': 'tmpl/index.html'
    }
  },
  dev: {
    files: {
      'index.php': 'tmpl/index.html'
    }
  }
};

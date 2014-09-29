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
      'index.php': 'tmpl/index.php'
    }
  },
  dev: {
    files: {
      'index.php': 'tmpl/index.php'
    }
  }
};

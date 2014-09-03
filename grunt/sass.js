/*global module*/
//
// Grunt - sass.js
//
// ==========================================================================

module.exports = {
  dev: {
    options: {
      style: 'expanded',
      require: 'susy',
      compass: true,
      sourcemap: true
    },
    files: {
      'css/base.css': 'css/base.scss'
    }
  },
  dist: {
    options: {
      style: 'compressed',
      require: 'susy',
      compass: true,
      sourcemap: false
    },
    files: {
      'css/dist.css': 'css/base.scss'
    }
  }
};
/*global module*/
//
// Grunt - notify.js
//
// ==========================================================================

module.exports = {
	dev: {
  	options: {
  		title: 'Grunt',
  		message: 'Build Completed'
  	}
  },
  sass: {
  	options: {
  		title: 'Grunt',
  		message: 'Sass Compiled'
  	}
  },
  js: {
  	options: {
  		title: 'Grunt',
  		message: 'JS Uglified'
  	}
  },
  dist: {
  	options: {
  		title: 'Grunt',
  		message: 'Shipped'
  	}
  }
};
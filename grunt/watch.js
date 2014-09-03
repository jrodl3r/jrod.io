/*global module*/
//
// Grunt - watch.js
//
// ==========================================================================

module.exports = {
  sass: {
    files: 'css/**/*.scss',
    tasks: ['sass:dev']
  },
  js: {
    files: '<%= jshint.dist.src %>',
    tasks: ['jshint']
  },
  html: {
    files: 'tmpl/index.html',
    tasks: ['targethtml:dev']
  },
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: ['jshint:gruntfile']
  },
	options: {
		livereload: true
	}
};
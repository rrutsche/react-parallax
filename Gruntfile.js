var os = require('os');
module.exports = function (grunt) {

	// load grunt modules
	require('load-grunt-tasks')(grunt);

	// port
	var defaultPort = os.platform().indexOf('win') === 0 ? 80 : 8080;
	var port = grunt.option('port') || grunt.option('p') || defaultPort;

	/**
	 * GRUNT CONFIG
	 */
	grunt.initConfig({

		// Web Server
		connect: {
			server: {
				options: {
					port: port,
					base: 'www/'
				}
			}
		},

		// do something on file change
		watch: {
			// common options
			options: {
				livereload: (port === 80 ? true : 1337),
				spawn: false
			},

			// restart grunt on Gruntfile change
			gruntfile: {
				files: ['Gruntfile.js', 'package.json'],
				tasks: ['eslint', 'build-kitchensink'],
				reload: true,
				livereload: false
			},
			// restart grunt on Gruntfile change
			karmafile: {
				files: 'karma.conf.js',
				tasks: ['test'],
				livereload: false
			},
			// Re-build kitchensink
			kitchensink: {
				files: ['src/**/*.js', 'src/**/*.jsx'],
				tasks: ['build-kitchensink']
			},
			// livereload on html change
			html: {
				files: 'src/*.html',
				tasks: ['copy:kitchensink']
			},
			assets: {
				files: ['src/assets/**/*'],
				tasks: ['copy:assets']
			},
			test: {
				files: ['src/test/**/*.js', 'src/test/**/*.jsx'],
				tasks: ['test'],
				livereload: false
			}
		},

		copy: {
			// copy html files to www directory
			kitchensink: {
				expand: true,
				cwd: 'src/',
				src: '*.html',
				dest: 'www/',
				filter: 'isFile'
			},
			assets: {
				expand: true,
				cwd: 'src/assets/',
				src: ['**/*'],
				dest: 'www/assets/'
			}
		},

		// clean directories for re-compiling
		clean: {
			test: 'test/*',
			kitchensink: 'www/*',
			dist: 'dist/*'
		},

		// concatenate all files into one after react compilation
		browserify: {
			options: {
				transform: [
					['babelify']
				]
			},
			// compile test files
			test: {
				src: ['src/test/**/*.jsx', 'src/test/**/*.js'],
				dest: 'test/test.built.js'
			},
			kitchensink: {
				src: ['src/index.jsx'],
				dest: 'www/js/app.built.js'
			},
			dist: {
				files: {
					'dist/index.js': 'src/jsx/index.jsx'
				}
			}
		},

		babel: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/jsx',
					src: ['**/*.jsx'],
					dest: 'dist',
					ext: '.js'
				}]
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'dist/index.js': ['dist/index.js']
				}
			}
		},

		eslint: {
			target: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.jsx', 'src/test/**/*.js', 'src/test/**/*.jsx']
		},

		// testing environment
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			defaultBrowser: {},
			defaultBrowser_keepalive: {
				singleRun: false
			}
		}
	});


	grunt.registerTask('build-dist', ['clean:dist', 'eslint', 'babel:dist', 'copy']);
	grunt.registerTask('build-kitchensink', ['clean:kitchensink', 'eslint', 'babel:dist', 'browserify:kitchensink', 'copy']);
	grunt.registerTask('build-test', ['clean:test', 'eslint', 'browserify:test']);

	// registering test task (Use test-debug to debug tests)
	grunt.registerTask('default', ['build-kitchensink', 'connect', 'watch']);
	grunt.registerTask('dist', ['build-dist']);
	grunt.registerTask('test', ['build-dist','build-test', 'karma:defaultBrowser']);
	grunt.registerTask('test-debug', ['build-dist','build-test', 'karma:defaultBrowser_keepalive']);
};
// Karma configuration
// Generated on Thu Nov 06 2014 14:10:34 GMT+0100 (Mitteleuropäische Zeit)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // How long does Karma wait for a browser to reconnect (in ms).
        browserDisconnectTimeout: 31000,

		// How long will Karma wait for a message from a browser before disconnecting from it (in ms).
		browserNoActivityTimeout: 31000,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/es5-shim/es5-shim.js',
            'node_modules/es5-shim/es5-sham.js',
            'test/test.built.js'
        ],


        // list of files to exclude
		exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome_unsecure'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,


        // Customized launcher
        customLaunchers: {
            Chrome_unsecure: {
                base: 'Chrome',
				flags: ['--disable-web-security']
			}
		}

    }); //config.set
}; // module.exports
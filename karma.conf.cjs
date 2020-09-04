var sProjectRoot = __dirname + '/';

var fnIsCoverageRun = function ( oConfig ) {
	return !!oConfig.coverage;
};

var fnGetWebpackConfig = function ( oConfig ) {
	var oWebpackConfig = {
		mode: 'none',
		module: {
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									"@babel/preset-env",
								]
							],
							plugins: [
								"@babel/plugin-proposal-class-properties",
								[
									"@babel/plugin-transform-runtime",
									{
										"corejs": false,
										"helpers": true,
										"regenerator": true,
										"useESModules": false
									}
								]
							]
						}
					},
					// https://github.com/webpack/webpack/issues/2031#issuecomment-219040479
					exclude: /node_modules\/(?!(di-box)\/).*/
				},
			]
		},
		resolve:{
			alias: {
				"di-box": sProjectRoot
			},
			modules: [ sProjectRoot + '/node_modules' ]
		}
	};
	oWebpackConfig.entry = '';
	oWebpackConfig.plugins = [];
	oWebpackConfig.devtool = 'source-map';

	// если этот запрос только генерация coverage
	if ( fnIsCoverageRun( oConfig ) ) {
		oWebpackConfig.module.rules.push(
			{
				test: /\.js$/,
				use: {
					loader: 'istanbul-instrumenter-loader',
					options: {esModules: true}
				},
				enforce: 'post',
				exclude: /node_modules|tests/
			}
		);
	}
	return oWebpackConfig;
};

var fnGetReporters = function ( oConfig ) {
	var aReporters = ['dots'];
	if ( fnIsCoverageRun( oConfig ) ) {
		aReporters.push( 'coverage-istanbul' );
	}
	return aReporters;
};


module.exports = function ( config ) {
	config.set( {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: sProjectRoot,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'tests/*Spec.js',
		],

		// list of files / patterns to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/*Spec.js': ['webpack', 'sourcemap'],
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: fnGetReporters( config ),

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		//browsers: [ 'Firefox', 'Chrome', 'IE9', 'IE10', 'IE11' ],
		//browsers: [ 'IE9' ],
		browsers: ['Chrome'],
		browserNoActivityTimeout: 4000,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		webpack: fnGetWebpackConfig( config ),

		// karma-coverage-istanbul-reporter config
		coverageIstanbulReporter: {
			reports: ['html'],
			fixWebpackSourcePaths: true
		}
	} )
};
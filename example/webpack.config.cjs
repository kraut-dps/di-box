var oConfig = {
	entry: {
		"example-di-box": __dirname + '/example-di-box/index.js',
		"example-inversify": __dirname +'/example-inversify/index.ts',
		"example-typedi": __dirname +'/example-typedi/index.ts',
		"example-awilix": __dirname +'/example-awilix/index.ts',
		"example-tsyringe": __dirname +'/example-tsyringe/index.ts',
		"example-bottlejs": __dirname +'/example-bottlejs/index.js',
	},
	output: {
		filename: "[name]/index.js",
		chunkFilename: '[name].js',
		path: __dirname + '/build/',
		publicPath: '/build/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								"@babel/preset-env"
							]
						],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-proposal-function-bind",
							"@babel/plugin-proposal-object-rest-spread",
							"@babel/plugin-syntax-dynamic-import",
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
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	devServer: {
		contentBase: __dirname,
		open: true, // open browser

		// только чтобы правильно хост и порт устанавливался в sockJs http://localhost:8080/sockjs-node/info...
		openPage: 'http://localhost:8080',
		public: 'http://0.0.0.0',
		disableHostCheck: true,

		watchContentBase: true, // HMR для html частей приложения

		//contentBase: __dirname,

		overlay: true, // display error overlay
		stats: "errors-only"
	}
};

module.exports = ( oEnv, oArgv ) => {
	if (oArgv.mode === 'development') {
		oConfig.devtool = 'eval-cheap-module-source-map';
	}
	if (oArgv.mode === 'production') {
		oConfig.devtool = 'source-map';
	}
	return oConfig;
};
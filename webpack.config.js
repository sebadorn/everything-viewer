const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );

const path = require( 'path' );

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve( __dirname, 'dist' ),
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
			{
				test: /\.(gif|jpeg|jpg|png)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.wasm/,
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			'...',
			new CssMinimizerPlugin(),
			new MiniCssExtractPlugin(),
		],
	},
	resolve: {
		fallback: {
			'fs': false,
			'path': false,
		},
	},
};

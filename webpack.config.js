const CopyPlugin = require( 'copy-webpack-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const path = require( 'path' );

module.exports = {
	entry: './src/main.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.s?css$/,
				include: path.resolve( __dirname, 'src/style' ),
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(gif|jpeg|jpg|png)$/,
				include: path.resolve( __dirname, 'src/img' ),
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				include: path.resolve( __dirname, 'src/style/fonts' ),
				type: 'asset/resource',
			},
			{
				test: /\.wasm/,
				include: path.resolve( __dirname, 'node_modules/@cornerstonejs' ),
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				extractComments: false,
			} ),
			new CssMinimizerPlugin(),
			new MiniCssExtractPlugin(),
		],
	},
	output: {
		clean: true,
		filename: 'bundle.js',
		path: path.resolve( __dirname, 'dist' ),
	},
	plugins: [
		new CopyPlugin( {
			patterns: [
				{
					from: path.resolve( __dirname, 'src/html/*.html' ),
					to: '[name][ext]',
				},
			],
 		} ),
	],
	resolve: {
		fallback: {
			'fs': false,
			'path': false,
		},
	},
};

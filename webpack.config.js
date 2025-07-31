const CopyPlugin = require( 'copy-webpack-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const fs = require( 'node:fs' );
const path = require( 'node:path' );

const outputDir = path.resolve( __dirname, 'dist' );


module.exports = {
	entry: './src/main.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.s?css$/,
				include: path.resolve( __dirname, 'src', 'style' ),
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.png$/,
				include: path.resolve( __dirname, 'src', 'img' ),
				type: 'asset/resource',
			},
			{
				test: /\.woff2$/i,
				include: path.resolve( __dirname, 'src', 'style', 'fonts' ),
				type: 'asset/resource',
			},
			{
				test: /\.wasm/,
				include: path.resolve( __dirname, 'node_modules', '@cornerstonejs' ),
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
		path: outputDir,
	},
	plugins: [
		new CopyPlugin( {
			patterns: [
				{
					from: path.resolve( __dirname, 'src', 'html', '*.html' ),
					to: '[name][ext]',
				},
				{
					from: path.resolve( __dirname, 'src', 'img', 'favicon' ),
					to: '[name][ext]',
				},
			],
 		} ),
		{
			apply: compiler => {
				compiler.hooks.afterEmit.tap( 'AddBuildNumberPlugin', _compilation => {
					const date = new Date();
					const year = date.getFullYear();
					const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
					const day = String( date.getDate() ).padStart( 2, '0' );
					const buildNumber = `${year}-${month}-${day}`;

					const fileIndex = path.resolve( outputDir, 'index.html' );
					let content = fs.readFileSync( fileIndex ).toString();
					content = content.replaceAll( '$BUILD', buildNumber );
					fs.writeFileSync( fileIndex, content );
				} );
			},
		},
	],
	resolve: {
		fallback: {
			'buffer': require.resolve( 'buffer/' ),
			'fs': false,
			'path': require.resolve( 'path-browserify' ),
		},
	},
};

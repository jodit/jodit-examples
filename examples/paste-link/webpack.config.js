const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
	entry: './src/index.tsx',
	output: {
		clean: true,
		publicPath: '/',
		filename: 'paste-link.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		open: true,
		allowedHosts: 'all',
		client: {
			progress: true,
			overlay: true
		},
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/']
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader']
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset'
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};

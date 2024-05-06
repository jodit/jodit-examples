const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('node:fs');
const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const entries = fs.readdirSync(path.resolve(process.cwd(), './examples'), {
	withFileTypes: true
})
	.filter(
		(file) =>
			file.isDirectory() &&
			fs.existsSync(
				path.resolve(
					process.cwd(),
					`./examples/${file.name}/src/index.tsx`
				)
			)
	)
	.reduce((acc, file) => {
		return {
			...acc,
			[file.name]: {
				import: path.resolve(
					process.cwd(),
					`./examples/${file.name}/src/index.tsx`
				),
				filename: `${file.name}.js`
			}
		};
	}, {});

const config = {
	entry: entries,
	output: {
		clean: true,
		publicPath: '/',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		open: true,
		allowedHosts: 'all',
		static: {
			directory: path.resolve(__dirname, './dist')
		},
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
	plugins: []
};

Object.keys(entries).forEach((name) => {
	config.plugins.push(
		new htmlWebpackPlugin({
			template: path.resolve(
				process.cwd(),
				`./examples/${name}/src/index.html`
			),
			title: name,
			filename: `${name}.html`,
			inject: 'body',
			chunks: [name]
		})
	);
});

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};

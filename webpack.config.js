const path = require( 'path' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const rootDir = path.resolve( __dirname );

const paths = {
	srcDir: path.resolve( rootDir, 'src' ),
	buildDIr: path.resolve( rootDir, 'build' ),
};

module.exports = {
	...defaultConfig,
	resolve: {
		...defaultConfig.resolve,
		// alias directories to paths you can use in import() statements
		alias: {
			components: path.join( paths.srcDir, 'components' ),
		},
	},
};


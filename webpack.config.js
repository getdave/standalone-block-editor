const path = require( 'path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const rootDir = path.resolve(__dirname);

const paths = {
    srcDir: path.resolve(rootDir, 'src'),
    buildDIr: path.resolve(rootDir, 'build')
};

module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'build')
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('autoprefixer')()],
                            // sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            //sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        ...defaultConfig.plugins,
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        ...defaultConfig.resolve,
        // alias directories to paths you can use in import() statements
        alias: {
            components: path.join(paths.srcDir, 'components'),
        }
    }
};


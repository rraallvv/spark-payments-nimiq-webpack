const path = require('path');
const webpack = require('webpack');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Project setup
const svelteOptions = require('./svelte.config.js');
const extensions = ['.mjs', '.js', '.svelte', '.html', '.json'];
const mainFields = ['svelte', 'browser', 'module', 'main'];
// Base URL is passed to JS and SCSS
// update as needed for production.
// IMPORTANT: It must be also updated in package.json
// in the script "build:html:prod" -> baseurl.
const baseURL = '';

module.exports = (env, options) => {
  const DEVELOPMENT = options.mode === 'development';
  return {
    entry: {
      app: './src/index.js'
    },
    resolve: {
      mainFields,
      extensions,
      alias: {
        'svelte': path.resolve('node_modules', 'svelte'),
      },
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|svelte)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: path.join(__dirname, 'src'),
          options: {
            formatter: require('eslint-friendly-formatter'),
          }
        },
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: svelteOptions(DEVELOPMENT),
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader', options: {
              presets: [
                ['@babel/preset-env'],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader, options: {
                hmr: DEVELOPMENT,
              },
            },
            {
              loader: 'css-loader', options: {
                sourceMap: DEVELOPMENT,
                url: false,
              },
            },
          ],
        },
        {
          test: /base\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader, options: {
                hmr: DEVELOPMENT,
              },
            },
            {
              loader: 'css-loader', options: {
                sourceMap: DEVELOPMENT,
                url: false,
              },
            },
            {
              loader: 'sass-loader', options: {
                sourceMap: DEVELOPMENT,
                prependData: '$__BASEURL__: "' + baseURL + '";',
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        },
      ],
    },
    devtool: DEVELOPMENT ? 'source-map' : '',
    plugins: [
      new MiniCssExtractPlugin({
        filename: DEVELOPMENT
          ? 'css/[name].css'
          : 'css/[name].min.css',
      }),
      new webpack.DefinePlugin({
        __BASEURL__: JSON.stringify(baseURL),
      }),
      new CopyPlugin(DEVELOPMENT ? [] : [
        {from: 'assets', to: 'assets'},
      ]),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
    ],
    output: {
      path: path.join(__dirname, DEVELOPMENT
        ? 'dev'
        : 'dist'),
      publicPath: '/',
      filename: DEVELOPMENT
        ? 'js/[name].js'
        : 'js/[name].min.js',
      sourceMapFilename: DEVELOPMENT
        ? 'js/[name].map'
        : '',
    },
    devServer: {
      historyApiFallback: {
        index: 'index.html',
      },
    },
  };
};

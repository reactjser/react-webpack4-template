const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const baseCssRules = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: false
    }
  }
];

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: baseCssRules
      },
      {
        test: /\.scss/,
        use: [
          ...baseCssRules,
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[chunkhash].js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: '"/"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: 'dependency',
      templateParameters: {
        BASE_URL: '/'
      }
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: '',
        ignore: ['index.html']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,  // cra set it as false?
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});

if (process.env.npm_config_report) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

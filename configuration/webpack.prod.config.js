/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpackConfiguration = require('../webpack.config');
const mode = 'production';

module.exports = merge(
  webpackConfiguration(mode),
  {
    mode: mode,
    devtool: false,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    plugins: [],
  }
);

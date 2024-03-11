const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => ['.html', '.ejs'].includes(path.extname(file).toLowerCase())).map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, '.html'),
  }));

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template.output,
  template: path.resolve(environment.paths.source, template.input),
  favicon: path.resolve(environment.paths.source, 'imgs', 'favicon.ico'),
}));

module.exports = (mode) => {
  return {
    entry: {
      app: path.resolve(environment.paths.source, 'js', 'app.js'),
    },
    output: {
      filename: 'js/[name].js',
      path: environment.paths.outputs[mode],
    },
    module: {
      rules: [
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(png|gif|jpe?g|svg)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: environment.limits.imgs,
            },
          },
          generator: {
            filename: 'imgs/design/[name].[hash:6][ext]',
          },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: environment.limits.imgs,
            },
          },
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.svg$/,
          loader: "svg-sprite-loader",
          options: {
            extract: true,
            publicPath: "/",
            symbolId: filePath => {
              return path
                .basename(filePath)
                .replace(".svg", "")
                .toLowerCase();
            },
            spriteFilename: "sprite.svg",
            esModule: false
          }
        }
      ]
    },
    optimization: {
      minimizer: [
        '...',
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        name: 'removeViewBox',
                        active: false,
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
      }),
      new SpriteLoaderPlugin({
        plainSprite: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(environment.paths.source, 'imgs', 'content'),
            to: path.resolve(environment.paths.outputs[mode], 'imgs', 'content'),
            toType: 'dir',
            globOptions: {
              ignore: ['*.DS_Store', 'Thumbs.db'],
            },
          },
        ],
      }),
    ].concat(htmlPluginEntries),
    target: 'web',
  };
}
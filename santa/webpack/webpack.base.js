var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var rucksack = require('rucksack-css')
var _ = require("case")
var path = require('path');
var pkg = require(
  path.join(
    process.cwd(),
    'package.json'
  )
);

module.exports = {
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    chunkFilename: '[name].bundle.js',
    publicPath: `//${pkg.cdn}/${pkg.name}/${pkg.version}/`
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['html-loader']
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!less-loader' })
      }, {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' })
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)/,
        loaders: ['url?limit=100000,img?minimize']
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                require.resolve('babel-preset-react'),
                [require.resolve('babel-preset-es2015'), { modules: false }],
                require.resolve('babel-preset-stage-0'),
              ],
              plugins: [require.resolve("babel-plugin-transform-runtime")]
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      postcss: function () {
        return [
          rucksack({
            autoprefixer: true
          })
        ]
      }
    })
  ]
};

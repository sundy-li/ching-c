var baseConfig = require('./webpack.base.js')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')

module.exports = Object.assign({}, baseConfig, {
  entry: {
    index: ['../wrapper/index.js']
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    library: "RelimReactComponents",
    libraryTarget: 'umd',
    publicPath: '/build/',
    chunkFilename: '[name].bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['html-loader']
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)/,
        loaders: ['url?limit=100000,img?minimize']
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    '@alife/next': {
      root: 'Next',
      commonjs2: '@alife/next',
      commonjs: '@alife/next',
      amd: '@alife/next'
    }
  },


  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
})

var baseConfig = require('./webpack.base.js')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')

module.exports = Object.assign({}, baseConfig, {
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
    },
    'antd': 'antd',
    'echarts': 'echarts'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new ExtractTextPlugin('index.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
})

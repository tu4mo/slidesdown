const isDev = process.env.NODE_ENV !== 'production'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false,
        target: 'https://us-central1-slidesdown-2a4ab.cloudfunctions.net'
      }
    }
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        loader: 'file-loader',
        test: /\.(jpg|png|svg)$/
      },
      {
        loader: 'raw-loader',
        test: /\.css$/
      }
    ]
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new CopyWebpackPlugin([{ from: 'src/assets' }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, '/src/index.html')
    })
  ]
}

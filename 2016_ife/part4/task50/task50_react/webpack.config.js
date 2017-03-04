var webpack = require('webpack'),
    path = require('path')//获取路径

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'myQ.bundle.js',
    path: path.resolve(__dirname, "build")
  },
  resolve: {
      extensions: ['', '.js', '.jsx']//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}

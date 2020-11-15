const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  context: process.cwd(),
  entry: {
    app: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          { loader: 'ts-loader', options: { transpileOnly: true } }
        ]
      },
      {
        test: /\.(gltf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Three.js Animated Background Conecpt',
      template: 'src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

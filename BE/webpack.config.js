// webpack.config.js
module.exports = {
    entry: './index.js',
    output: {
      path: 'C:/Workspace/gestione-progetti/BE/dist',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  };
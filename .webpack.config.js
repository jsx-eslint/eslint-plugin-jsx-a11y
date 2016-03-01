module.exports = {
  entry: './lib/index.js',

  output: {
    filename: 'index.js',
    path: './'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};

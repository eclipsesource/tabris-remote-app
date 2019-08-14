module.exports = {
  entry: "./src/app.ts",
  externals: ['tabris'],
  output: {
    libraryTarget: 'commonjs2',
    filename: "index.js",
    path: __dirname + "/dist"
  },
  resolve: { extensions: [".ts", ".tsx", ".json", ".js"] },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  }
};
const { resolve } = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge.smart(commonConfig, {
    entry: "./dist",
    output: {
        path: __dirname + "/dist-dev"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader", options: { configFile: 'tsconfig.json' } }
        ]
    }
});
module.exports = {
  devServer: {
    port: 8090,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  productionSourceMap: true,
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      splitChunks: false
    }
  }
}

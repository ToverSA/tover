module.exports = {
  pwa: {
    themeColor: '#FFA000',
    msTileColor: '#FFFFFF',
    name: 'Tover',
  },

  baseUrl: undefined,
  outputDir: '../public_html',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true,
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: ['vuex-persist'],
};

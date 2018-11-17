module.exports = {
  pwa: {
    themeColor: '#009688',
    msTileColor: '#FFFFFF',
    name: 'Tover',
  },

  baseUrl: undefined,
  outputDir: undefined,
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

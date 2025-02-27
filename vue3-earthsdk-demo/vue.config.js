const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  filenameHashing: false,
  css: {
    extract: true,
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      inject: false,
      minify: false,
    },
  },
  publicPath: './',
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: {
        '/findByTdm': {
          target: 'http://172.18.33.200',
          changeOrigin: true,
          pathRewrite: { '^/findByTdm': '' },
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      }
    },
    optimization: {
      splitChunks: false,
    },
    externals: {
      // @cesium
      cesium: 'Cesium', // xr-utils中有cesium相关的函数
      // @xbsj-renderer
      'xbsj-renderer/dist-node/xr-base-utils': 'xbsj["xr-base-utils"]',
      'xbsj-renderer/dist-node/xr-math': 'xbsj["xr-math"]',
      'xbsj-renderer/dist-node/xr-utils': 'xbsj["xr-utils"]',
      'xbsj-renderer/dist-node/xr-cesium': 'xbsj["xr-cesium"]',
      // @xbsj-xe2
      'xbsj-xe2/dist-node/xe2': 'XE2["xe2"]',
      'xbsj-xe2/dist-node/xe2-base': 'XE2["xe2-base"]',
      'xbsj-xe2/dist-node/xe2-base-utils': 'XE2["xe2-base-utils"]',
      'xbsj-xe2/dist-node/xe2-utils': 'XE2["xe2-utils"]',
      'xbsj-xe2/dist-node/xe2-cesium': 'XE2["xe2-cesium"]',
      'xbsj-xe2/dist-node/xe2-mapbox': 'XE2["xe2-mapbox"]',
      'xbsj-xe2/dist-node/xe2-ue': 'XE2["xe2-ue"]',
      'xbsj-xe2/dist-node/utility-xe2-plugin': 'XE2["utility-xe2-plugin"]',
      'xbsj-xe2/dist-node/xe2-all-in-one': 'XE2["xe2-all-in-one"]',
      'xbsj-xe2/dist-node/xe2-base-objects': 'XE2["xe2-base-objects"]',
      'xbsj-xe2/dist-node/xe2-objects': 'XE2["xe2-objects"]',
      'xbsj-xe2/dist-node/xe2-cesium-objects': 'XE2["xe2-cesium-objects"]',
      'xbsj-xe2/dist-node/xe2-ue-objects': 'XE2["xe2-ue-objects"]',
      'xbsj-xe2/dist-node/xe2-openlayers': 'XE2["xe2-openlayers"]',
      'xbsj-xe2/dist-node/xe2-openlayers-objects': 'XE2["xe2-openlayers-objects"]',
      // plugins
      'smplotting-xe2-plugin/dist-node/smplotting-xe2-plugin': 'XE2["smplotting-xe2-plugin"]',
      'smplotting-xe2-plugin/dist-node/smplotting-xe2-plugin-main': 'XE2["smplotting-xe2-plugin-main"]',
      'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin': 'XE2["esobjs-xe2-plugin"]',
      'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main': 'XE2["esobjs-xe2-plugin-main"]',
    },
    resolve: {
      alias: {
        "@": path.resolve('./src')
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './node_modules/xbsj-xe2/dist-web',
          to: 'js/xbsj-xe2/dist-web',
          toType: 'dir'
        },
        {
          from: './node_modules/xbsj-xe2-assets/dist-web',
          to: 'js/xbsj-xe2-assets/dist-web',
          toType: 'dir'
        },
        {
          from: './node_modules/smplotting-xe2-plugin/dist-web',
          to: 'js/smplotting-xe2-plugin/dist-web',
          toType: 'dir'
        },
        {
          from: './node_modules/esobjs-xe2-plugin/dist-web',
          to: 'js/esobjs-xe2-plugin/dist-web',
          toType: 'dir'
        },
        {
          from: './node_modules/esobjs-xe2-plugin-assets/dist-web',
          to: 'js/esobjs-xe2-plugin-assets/dist-web',
          toType: 'dir'
        },
        {
          from: './node_modules/vue-xe2-plugin/dist-web',
          to: 'js/vue-xe2-plugin/dist-web',
          toType: 'dir'
        }
      ]),
    ],
  },
}

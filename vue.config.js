const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */

  publicPath: '/',

  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    proxy: {
      '/apis': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
         // target: ' http://192.168.1.179:9000',
         target: 'http://localhost:8087',
        ws: false,
        changeOrigin: true
      },
      // '/api': {
      //   target: 'http://192.168.1.128:8081',
      //   ws: false,
      //   changeOrigin: true,
      //   onProxyReq: function (proxyReq, req, res) {
      //     proxyReq.method = req.method
      //   }
      // }
      '/api': {
        // target: 'http://192.168.1.151:8082',
        // target: 'http://192.168.1.166:8081',
        // target: 'https://api.24ud.cn',
        // target: 'http://192.168.1.128:8081',
        // target: 'http://39.98.153.56:443', // 线上
         target:    'https://api.24ud.cn', // 服务器
        // target: 'http://192.168.1.153:8080',// 子豪
        // target: 'http://192.168.1.106:8080',// 思润
        ws: false,
        changeOrigin: true,
        onProxyReq: function (proxyReq, req, res) {
          // convert all api requests (POST/PUT/DELETE) to GET so they work in webpack dev server for mocking
          proxyReq.method = req.method
          proxyReq.path = req.url.replace('/api', '')
        }
      },
    }
  },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}



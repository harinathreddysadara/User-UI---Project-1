// const PROXY_TARGETS = {
//   SERVICE_ONE: 'http://localhost:3000/',
//   SERVICE_TWO: 'http://10.177.1.104:8080/'
// }

// module.exports = {
//   assetsDir: 'static',
//   devServer: {
//     overlay: {
//       warnings: true,
//       errors: true
//     },
//     proxy: {
//       '^/api/': {
//         target: PROXY_TARGETS.SERVICE_TWO,
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: { '^/api/': '' }
//       }
//     }
//   },
//   lintOnSave: true,
//   pages: {
//     index: {
//       entry: 'src/main.js',
//       title: 'Kumar Gaurav'
//     }
//   },
//   "transpileDependencies": [
//     "vuetify"
//   ]
// }

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ]
}
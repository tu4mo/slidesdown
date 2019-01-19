const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      secure: false,
      target: 'https://us-central1-slidesdown-2a4ab.cloudfunctions.net'
    })
  )
}

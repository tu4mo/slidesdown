const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      secure: false,
      target: 'https://us-central1-slidesdown-2a4ab.cloudfunctions.net',
    })
  )
}

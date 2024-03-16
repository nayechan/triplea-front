const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
        ['/post/**', '/get/**'],
        {
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
        ['/api/**'],
        {
            target: 'http://52.62.34.185:8080',
            changeOrigin: true,
        })
    );
};
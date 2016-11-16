const server_config = require('./config.js');
const port = process.env.PORT || 3000;
const app = server_config.app();
const conn_mongo = server_config.conn_mongo();

console.log(conn_mongo);

require('./routes/routes')(app);

// Development configuration
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath
  }))
}

// Start the application
app.listen(port, function () {
  console.log('MERN stack app listening on port ' + server_config.port + '!');
});
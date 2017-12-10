var http = require('http');
var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');

var ws = require('./websockets');
var serveStaticFile = require('./middleware-static-file');
var redirectTo = require('./redirect-to');

var app = express();
var router = express.Router();
var server = http.createServer(app);

var publicPath = path.join(__dirname, '..', 'client/public');

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(compression());
router.use('/static', express.static(publicPath));
router.get('/reports/:type', require('./route-reports'));
router.get('/error', require('./module-logger'));

// TODO: Remove.
router.get('/fake', serveStaticFile(path.join(publicPath, 'fake.html')));

router.get('/:type/:id?', require('./route-index'));
router.get('/', redirectTo('./messages/'));

app.use('/', router);

ws.installHandlers(server, {prefix: '.*/ws'});

module.exports = server;

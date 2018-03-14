const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const router = require('./router/router');
const logger = require('./logger');

const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_PATH, { useMongoClient: true });

const db = mongoose.connection;
db.once('open', logger.info.bind(console, 'connected to the database'));
db.on('error', logger.warn.bind(console, 'DATABASE ERROR:'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('*.js', (req, res, next) => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});
app.get('*.css', (req, res, next) => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
});
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/', router);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.listen(process.env.PORT || 3000);

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const router = require('./router');
const { gzipRedirect } = require('./middlewares');
const dbConnect = require('./db');

dbConnect();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('*.js', gzipRedirect);

app.use(express.static(path.join(__dirname, '../../public')));
app.use('/', router);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

app.listen(process.env.PORT || 3000);

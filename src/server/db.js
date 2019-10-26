const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.Promise = Promise;

const connect = () =>
    mongoose
        .connect(
            process.env.MONGO_PATH,
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            }
        )
        .then(logger.info.bind(console, 'connected to the database'))
        .catch(logger.warn.bind(console, 'DATABASE ERROR:'));

module.exports = connect;

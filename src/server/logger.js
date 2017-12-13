module.exports = {
    info(...args) {
        console.info('SERVER::: INFO::: ' + args.join(' --> '));
    },
    warn(...args) {
        console.warn('SERVER::: WARN::: ' + args.join(' --> '));
    },
    error(...args) {
        console.error('SERVER:::: ERROR::: ' + args.join(' --> '));
    },
};

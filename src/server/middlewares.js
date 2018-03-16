function gzipRedirect(req, res, next) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
}

module.exports = { gzipRedirect };

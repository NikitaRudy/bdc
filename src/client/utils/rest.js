const fetchBase = (method, url, body, options) =>
    fetch(url, {
        method,
        body,
        ...options,
    }).then(resp => resp.json());

export const get = url => fetchBase('GET', url);

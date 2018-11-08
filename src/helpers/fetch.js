require('es6-promise').polyfill();
require('isomorphic-fetch');

export const handleFetch = (url, method, value, useCache = true) =>
    fetch(`/api/${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': useCache ? 'max-age=86400>' : 'no-cache, max-age=0, no-store'
        },
        credentials: 'include',
        body: JSON.stringify(value)
    }).then((res) => res.json());

export const filesFetch = (url, fd) => {
    return fetch(`/api/${url}`, {
        method: 'POST',
        body: fd,
        credentials: 'include'
    }).then((res) => res.json());
};

export const elasticFetch = (url, method, value, useCache = true) =>
    fetch(`https://searfi.firstbridge.work/api/${url}`, {
        method,
        body: JSON.stringify(value)
    }).then((res) => res.json());

const superagent = require('superagent');
let HOST = "http://localhost:8000";
HOST = ''

/**
 * Obtener el token si es que hay uno
 */
const getToken = () => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //     return `Token ${token}`;
    // }
    return false;
}

/**
 * Obtener la url completade la peticion
 * @param {*} endpoint 
 * @param {*} params 
 */
export const makeUrl = (endpoint, params = {}) => {
    let url = `${HOST}/api`;
    if (endpoint[0] === '/') {
        url += `${endpoint}/`;
    } else {
        url += `/${endpoint}/`;
    }
    let firstParam = true;
    const dicKeys = Object.keys(params);
    dicKeys.forEach((row) => {
        if (firstParam) {
            url += `?${row}=${params[row]}`;
            firstParam = false;
        } else {
            url += `&${row}=${params[row]}`;
        }
    });
    console.log(url)
    return url;
}

/**
 * Funcion para manejar los errores de cualquier petición
 * @param response: response: response de la peticion
 * */
const errorHandler = (response) => {
    // if (response.statusCode === 401 || response.statusCode === 403) {
    //     localStorage.removeItem('token');
    //     window.location.assign('/#/login');
    // }
}


export function get(endpoint, params = {}) {
    const url = makeUrl(endpoint, params);
    const token = getToken();
    let request = null;
    return new Promise((resolve, reject) => {
        if (token) {
            request = superagent.get(url).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
        } else {
            request = superagent.get(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
        }
        request.then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export function post(endpoint, body={}) {
    const url = makeUrl(endpoint);
    const token = getToken();
    let request = null;
    return new Promise((resolve, reject) => {
        if (token) {
            request = superagent.post(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
        } else {
            request = superagent.post(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
        }
        request.then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export function postAttachments(endpoint, body, attachments=[]) {
    const url = makeUrl(endpoint);
    const token = getToken();
    let request = null;
    return new Promise((resolve, reject) => {
        if (token) {
            request = superagent.post(url).set('Authorization', token);
        } else {
            request = superagent.post(url);
        }
        attachments.forEach((attachment) => {
            request.attach(attachment.name, attachment.file);
        });
        for (const key in body) {
            request.field(key, body[key]);
        }

        request.then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export function put(endpoint, body={}) {
    const url = makeUrl(endpoint);
    const token = getToken();
    let request = null;
    return new Promise((resolve, reject) => {
        if (token) {
            request = superagent.put(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
        } else {
            request = superagent.put(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
        }
        request.then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export function putAttachments(endpoint, body, attachments=[]) {
    const url = makeUrl(endpoint);
    const token = getToken();
    let request = null;
    return new Promise((resolve, reject) => {
        if (token) {
            request = superagent.put(url).set('Authorization', token);
        } else {
            request = superagent.put(url);
        }
        attachments.forEach((attachment) => {
            request.attach(attachment.name, attachment.file);
        });
        for (const key in body) {
            request.field(key, body[key]);
        }

        request.then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export function remove(endpoint) {
    const url = makeUrl(endpoint);
    const token = getToken();
    let request = null;
    return new Promise((resolve, reject) => {
        if (token) {
            request = superagent.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
        } else {
            request = superagent.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
        }
        request.then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response);
        });
    });
}

export const api = { get, post, put, remove, postAttachments, putAttachments };

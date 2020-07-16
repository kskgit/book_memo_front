import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 160000,
});

const apiGet = (url, params = {}, headers = {}) =>
  api
    .get(url, {
      params: params,
    })
    .catch(err => err.response || { noResponse: true });

const apiDelete = (url, params = {}, headers = {}) =>
  api
    .delete(url, {
      headers: headers,
      params: params,
    })
    .catch(err => err.response || { noResponse: true });

const apiPost = (url, params = {}, headers = {}) =>
  api
    .post(url, params, {
      headers: headers,
    })
    .catch(err => err.response || { noResponse: true });

const apiPut = (url, params = {}, headers = {}) =>
  api
    .put(url, params, {
      headers: headers,
    })
    .catch(err => err.response || { noResponse: true });

const apiPostMultipartForm = (url, params = {}) =>
  api
    .post(url, params, {
      headers: {
        'content-Type': 'multipart/form-data',
      },
    })
    .catch(err => err.response || { noResponse: true });

export {
  apiGet,
  apiPost,
  apiDelete,
  apiPut,
  apiPostMultipartForm,
};

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

export {
    // api,
    // apiRequest,
  apiGet,
    // apiGetBlob,
  apiDelete,
    // apiHead,
    // apiOptions,
    // apiPut,
    // apiPatch,
};

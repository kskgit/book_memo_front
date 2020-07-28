export default ({store, $axios}, inject) => {
  $axios.interceptors.request.use(function (config) {
    store.dispatch('loading/loadingStart')
    config.baseURL = process.env.API_BASE_URL
    config.timeout = 160000
    return config;
  });
  $axios.interceptors.response.use(function (response) {
    store.dispatch('loading/loadingStop')
    return response;
  });

  const apiGet = function (url, params = {}, headers = {}) {
    return $axios.get(url, {
      params: params,
    })
    .catch(err => err.response || { noResponse: true })
  }
  const apiDelete = function  (url, params = {}, headers = {}) {
    return $axios.delete(url, {
        headers: headers,
        params: params,
      })
      .catch(err => err.response || { noResponse: true })
  }

  const apiPost = function  (url, params = {}, headers = {}) {
    return $axios.$post(url, params, {
      headers: headers
    }).catch(err => err.response || { noResponse: true })
  }

  const apiPut = function  (url, params = {}, headers = {}) {
    return $axios.put(url, params, {
        headers: headers,
      })
      .catch(err => err.response || { noResponse: true })
  }

  inject('apiGet', apiGet);
  inject('apiDelete', apiDelete);
  inject('apiPost', apiPost);
  inject('apiPut', apiPut);
}
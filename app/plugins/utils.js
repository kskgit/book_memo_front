import axios from 'axios';
const searchByRakutenBookAPI = (query) => {
  const APPLICATION_ID = '1073427335479601357'
  let params = `applicationId=${APPLICATION_ID}`;
  if(query.keyword) {
    params += `&keyword=${query.keyword}`
  }
  if(query.isbnjan) {
    params += `&isbnjan=${query.isbnjan}`
  }
  if(query.page) {
    params += `&page=${query.page}`
  }
  params += '&hits=15'
  return axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?" + params)
}

export default ({}, inject) => {
  inject('searchByRakutenBookAPI', searchByRakutenBookAPI);
}
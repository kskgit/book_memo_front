import axios from 'axios';
const serchRyRakutenBookAPI = (keyword, isbnjan = '') => {
  const APPLICATION_ID = '1073427335479601357'
  let params = `applicationId=${APPLICATION_ID}`;
  if(keyword) {
    params += `&keyword=${keyword}&orFlag=1`
  }
  if(isbnjan) {
    params += `&isbnjan=${isbnjan}`
  }
  return axios.get("https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?" + params)
  // .then((res) => {
  //   console.log(res)
  //   return res
  // })
}

export default ({}, inject) => {
  inject('serchRyRakutenBookAPI', serchRyRakutenBookAPI);
}
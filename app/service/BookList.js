import { apiGet, apiPut, apiDelete, apiPost } from '~/api/config';
const bookList = {
  getDbBooks: async (is_readed, uid) => {
    const url = 'books';
    const params = {
      is_readed: is_readed,
      uid: uid
    }
    // DBからデータ取得
    const res = await apiGet(url, params)
    return res.data;
  },
  updateReadStatus: (bookId, isReaded) => {
    const url = 'books/' + bookId;
    const params = {
      id: bookId,
      is_readed: isReaded
    }
    return apiPut(url, params)
  },
  deleteList: (bookId) => {
    const url = 'books/' + bookId;
    return apiDelete(url)
  },
  sortBooksAtDbOrder: (ggBooks, dbBooks) => {
    // google APIで取得したデータにDBの順番を割り当て
    dbBooks.map(book => {
      ggBooks.map((item, index) => {
        if(book.volume_id === item.id) {
          ggBooks[index]['bookId'] = book.id;
        }
      })
    })
    // 並び替え
    function compare (genreA, genreB) {
      let comparison = 0;
      if (genreA.bookId > genreB.bookId) {
        comparison = 1;
      } else if (genreA.bookId < genreB.bookId) {
        comparison = -1;
      }
      return comparison;
    }
    return ggBooks.sort(compare);
  },
  createBookList: (book) => {
    const url = 'books';
    let params = {
      uid: localStorage.getItem('uid'),
      artist_name: book.artistName,
      title: book.title,
      image_url: book.mediumImageUrl
    }

    if (book.mediumImageUrl) {
      params.image_url = book.mediumImageUrl
    }

    // TODO 写真撮影した場合の処理

    return apiPost(url, params)
  }
};

export default bookList;
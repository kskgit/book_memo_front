// export const state = () => ({})
// export const mutations = {}
export const actions = {
  async getDbBooks ({}, query) {
    const url = 'books';
    const params = {
      is_readed: query.isReaded,
      uid: query.uid
    }
    const res = await this.$apiGet(url, params)
    return res.data;
  },
  // updateReadStatus: (bookId, isReaded) => {
  //   const url = 'books/' + bookId;
  //   const params = {
  //     id: bookId,
  //     is_readed: isReaded
  //   }
  //   return apiPut(url, params)
  // },
  // deleteList: (bookId) => {
  //   const url = 'books/' + bookId;
  //   return apiDelete(url)
  // },
  // sortBooksAtDbOrder: (ggBooks, dbBooks) => {
  //   // google APIで取得したデータにDBの順番を割り当て
  //   dbBooks.map(book => {
  //     ggBooks.map((item, index) => {
  //       if(book.volume_id === item.id) {
  //         ggBooks[index]['bookId'] = book.id;
  //       }
  //     })
  //   })
  //   // 並び替え
  //   function compare (genreA, genreB) {
  //     let comparison = 0;
  //     if (genreA.bookId > genreB.bookId) {
  //       comparison = 1;
  //     } else if (genreA.bookId < genreB.bookId) {
  //       comparison = -1;
  //     }
  //     return comparison;
  //   }
  //   return ggBooks.sort(compare);
  // },
  // createBookList: (book) => {
  //   const url = 'books';

  //   const params = {
  //     uid: localStorage.getItem('uid'),
  //     author: book.author,
  //     title: book.title,
  //     image_url: book.mediumImageUrl
  //   }
  //   return apiPost(url, params)
  // },
  // createBookListByMultipartForm: (book) => {
  //   const url = 'books/create_by_multipart_form';

  //   const formData = new FormData();
  //   formData.append('image', book.imageFile);
  //   formData.append('uid', localStorage.getItem('uid'));
  //   formData.append('author', book.author);
  //   formData.append('title', book.title);
  //   return apiPostMultipartForm(url, formData)
  // }
}
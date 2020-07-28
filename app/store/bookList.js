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
  updateReadStatus ({}, query) {
    const url = 'books/' + query.bookId;
    const params = {
      id: query.bookId,
      is_readed: query.isReaded
    }
    return this.$apiPut(url, params)
  },
  updatePageNumber ({}, query) {
    const url = 'books/' + query.bookId;
    const params = {
      id: query.bookId,
      page_number: query.pageNumber
    }
    return this.$apiPut(url, params)
  },
  deleteList ({}, query) {
    const url = 'books/' + query.bookId;
    return this.$apiDelete(url)
  },
  createBookList ({}, book) {
    const url = 'books';
    const params = {
      uid: localStorage.getItem('uid'),
      author: book.author,
      title: book.title,
      image_url: book.largeImageUrl
    }
    return this.$apiPost(url, params)
  },
  createBookListByMultipartForm ({}, book) {
    const url = 'books/create_by_multipart_form';
    const headers = {
      'content-type': 'multipart/form-data',
    }
    const formData = new FormData();
    formData.append('image', book.imageFile);
    formData.append('uid', localStorage.getItem('uid'));
    formData.append('author', book.author);
    formData.append('title', book.title);
    return this.$apiPost(url, formData, headers)
  }
}
<template>
  <div>
    <b-alert show variant="info" v-if="dbBooks.length >0 ">読んでる本一覧</b-alert>
    <b-alert show variant="warning" v-else-if="dbBooks.length == 0  && finishInitialize">読んでる本はありません</b-alert>
    <b-row>
      <b-col
        cols="12" sm="6" lg="4"
        v-for="(book, index) in dbBooks"
        :key="index"
      >
        <BookBlock
          ref="bookBlock"
          :book="book"
          :book-index="index"
          @add-readed-list="addReadedList"
          @delete-list="deleteList"
          @update-page-number="updatePageNumber"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios';
import BookBlock from '@/components/BookBlock.vue';
export default {
  components: { BookBlock },
  created: async function() {
    await this.getIndex();
    this.finishInitialize = true
  },
  data: function () {
    return {
      dbBooks: [],
      finishInitialize: false
    }
  },
  watch: {},
  computed: {},
  methods:{
    // 一覧取得
    async getIndex(){
      // 初期化
      this.dbBooks = [];
      const res = await this.$store.dispatch('bookList/getDbBooks', {isReaded: false, uid: localStorage.getItem('uid')})
      if (res.status === 200) {
        this.dbBooks = res.data
      } else {
        this.$router.push('/error')
      }
    },
    // ステータス更新
    async addReadedList(bookId, isReaded) {
      await this.$store.dispatch('bookList/updateReadStatus', {bookId: bookId, isReaded: isReaded})
      this.$router.push('/list/readed')
    },
    // ページ数更新
    async updatePageNumber(bookId, inputPageNumber, index) {
      const res = await this.$store.dispatch('bookList/updatePageNumber', {bookId: bookId, pageNumber: inputPageNumber})
      this.dbBooks[index].page_number = res.data.page_number
      this.$refs.bookBlock[index].setInputPageNumber()
    },
    // 削除
    async deleteList(bookId) {
      await this.$store.dispatch('bookList/deleteList', {bookId: bookId})
      this.getIndex();
    },
  }
}
</script>

<style></style>
<template>
  <div>
    <b-alert show variant="success" v-if="dbBooks.length >0">読んだ本一覧</b-alert>
    <b-alert show variant="warning" v-else-if="dbBooks.length == 0  && finishInitialize">読んだ本はありません</b-alert>
    <b-row>
      <b-col
        cols="12" sm="6" lg="4"
        v-for="(book, index) in dbBooks"
        :key="index"
      >
        <BookBlock
          :book="book"
          @back-reading-list="backReadingList"
          @delete-list="deleteList"
        ></BookBlock>
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
      const res = await this.$store.dispatch('bookList/getDbBooks', {isReaded: true, uid: localStorage.getItem('uid')})
      this.dbBooks = res.data
    },
    // ステータス更新
    async backReadingList(bookId, isReaded) {
      await this.$store.dispatch('bookList/updateReadStatus', {bookId: bookId, isReaded: isReaded})
      this.$router.push('/list/reading')
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
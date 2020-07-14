<template>
  <div>
    <p>読んだ本</p>
    <b-row>
      <b-col
        cols="12" sm="6" lg="4"
        v-for="(book, index) in dbBooks"
        :key="index"
      >
        <bookBlock
          :book="book"
          @back-reading-list="backReadingList"
          @delete-list="deleteList"
        ></bookBlock>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import BookList from '@/service/BookList'
import bookBlock from '@/components/bookBlock.vue';
export default {
  components: { bookBlock },
  created: function() {
    this.getIndex();
  },
  data: function () {
    return {
      dbBooks: [],
    }
  },
  watch: {},
  computed: {},
  methods:{
    // 一覧取得
    async getIndex(){
      // 初期化
      this.dbBooks = [];
      this.dbBooks = await BookList.getDbBooks(true, localStorage.getItem('uid'));
    },
    // ステータス更新
    async backReadingList(bookId, isReaded) {
      await BookList.updateReadStatus(bookId, isReaded);
      this.getIndex();
      this.$router.push('/list/reading')
    },
    // 削除
    async deleteList(bookId) {
      await BookList.deleteList(bookId);
      this.getIndex();
    },
  }
}
</script>

<style></style>
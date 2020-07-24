<template>
  <div>
    <b-alert show variant="success" v-if="dbBooks.length >0">読んだ本一覧</b-alert>
    <b-alert show variant="warning" v-else>読んだ本はありません</b-alert>
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
import BookList from '@/service/BookList'
import BookBlock from '@/components/BookBlock.vue';
export default {
  components: { BookBlock },
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
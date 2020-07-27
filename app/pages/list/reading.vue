<template>
  <div>
    <b-alert show variant="info" v-if="dbBooks.length >0 ">読んでる本一覧</b-alert>
    <b-alert show variant="warning" v-else>読んでる本はありません</b-alert>
    <b-row>
      <b-col
        cols="12" sm="6" lg="4"
        v-for="(book, index) in dbBooks"
        :key="index"
      >
        <BookBlock
          :book="book"
          @add-readed-list="addReadedList"
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
      this.dbBooks = await this.$store.dispatch('bookList/getDbBooks', {isReaded: false, uid: localStorage.getItem('uid')})
    },
    // ステータス更新
    async addReadedList(bookId, isReaded) {
      await BookList.updateReadStatus(bookId, isReaded);
      this.getIndex();
      this.$router.push('/list/readed')
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
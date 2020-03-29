<template>
<div class="container">
  <Header @get-index = 'getIndex'/>
  <P v-if="isReaded">読んだ本</P>
  <P v-else>読んでる本</P>
  <b-row>
    <b-col
      cols="12" sm="6" lg="4"
      v-for="(item, index) in items"
      :key="index"
    >
      <bookBlock
        :item="item"
        @back-reading-list="backReadingList"
        @add-read-list="addReadList"
        @delete-list="deleteList"
      ></bookBlock>
    </b-col>
  </b-row>
</div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import bookBlock from '@/components/bookBlock.vue';
import { apiGet, apiPut, apiDelete } from '~/api/config';
export default {
  components: { Header,bookBlock },
  created: function() {
    this.getIndex();
  },
  data: function () {
    return {
      items: [],
      isReaded: false,
      getBookCount: 0,
      books: [],
    }
  },
  watch: {
    getBookCount: function () {
      if (this.getBookCount === this.books.length) {
        this.books.map(book => {
          this.items.map((item, index) => {
            if(book.volume_id === item.id) {
              this.items[index]['bookId'] = book.id;
            }
          })
        })
        function compare (genreA, genreB) {
          let comparison = 0;
          if (genreA.bookId > genreB.bookId) {
            comparison = 1;
          } else if (genreA.bookId < genreB.bookId) {
            comparison = -1;
          }
          return comparison;
        }
        this.items.sort(compare);
      }
    },
  },
  computed: {},
  methods:{
    // 一覧取得
    async getIndex(){
      // 初期化
      this.items = [];
      this.books = [];
      this.getBookCount = 0;
      this.isReaded = this.$store.getters['getIsReaded'] ? this.$store.getters['getIsReaded']: false;
      const url = 'books';
      const params = {
        is_readed: this.isReaded,
      }
      await apiGet(url, params).then(res => {
        this.books = res.data;
      })
      // googleapisからデータ取得
      await this.books.map(async (val, index) => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${val.volume_id}`)
          .then(res =>{
            this.getBookCount += 1;
            this.items.push(res.data);
          })
      })
    },
    // 読んだリストに追加
    addReadList(bookId, isReaded) {
      const params = {
        is_readed: isReaded
      };
      const url = 'books/' + bookId;
      apiPut(url, params).then(res => {
        this.$store.dispatch('setIsReaded', true);
        this.getIndex();
      })
    },
    backReadingList(bookId, isReaded) {
      const url = 'books/' + bookId;
      const params = {
        id: bookId,
        is_readed: isReaded
      }
      apiPut(url, params).then(res => {
        if (res.status = 200) {
          this.$store.dispatch('setIsReaded', isReaded)
          this.getIndex();
        }
      });
    },
    // 読んでるリストから削除
    deleteList(bookId) {
      const url = 'books/' + bookId;
      apiDelete(url).then(res => {
        this.getIndex();
      })
    },
  }
}
</script>

<style></style>
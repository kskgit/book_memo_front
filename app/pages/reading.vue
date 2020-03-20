<template>
<div class="container">
  <Header />
  <b-row>
    <b-col cols="12" sm="6" lg="4" v-for="(item, index) in items" :key="index">
      <b-card
        :title="item.volumeInfo.title"
        :img-src="imageUrl(item)"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
      >
        <b-card-text v-if="item.volumeInfo.subtitle">
          {{item.volumeInfo.subtitle}}
        </b-card-text>
        <b-card-text v-for="(author, authorIndex) in item.volumeInfo.authors" :key="authorIndex">
          {{author}} 著
        </b-card-text>
        <b-button href="#" variant="primary" @click="addHistory(item)">読書メモ一覧</b-button>
        <b-button href="#" variant="primary" @click="addReadList(item)">読んだリストに追加する</b-button>
        <b-button href="#" variant="primary" @click="deleteList(item)">削除</b-button>
      </b-card>
    </b-col>
  </b-row>

</div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import { apiGet } from '~/api/config';
export default {
  components: { Header },
  created: function() {
    this.index();
  },
  data: function () {
    return {
      query: '',
      items: [],
    }
  },
  computed: {},
  methods:{
    // 一覧取得
    async index(){
      const url = 'books';
      let array = [];
      await apiGet(url).then(res => {
        array = res.data;
      })
      // id検索
      array.map(val => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${val.volume_id}`).then(res => {
          this.items.push(res.data);
        });
      })
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    // 履歴を追加
    addHistory(book) {
    },
    // 読んだリストに追加
    addReadList(book) {
    },
    // 読んでるリストから削除
    deleteList(book) {
    },
  }
}
</script>

<style></style>
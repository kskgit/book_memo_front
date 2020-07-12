<template>
  <div>
    <b-card
      :title="book.volumeInfo.title"
      :img-src="imageUrl(book)"
      img-height = '200'
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
    >
      <b-card-text v-if="book.volumeInfo.subtitle">
        {{book.volumeInfo.subtitle}}
      </b-card-text>
      <b-card-text v-for="(author, authorIndex) in book.volumeInfo.authors" :key="authorIndex">
        {{author}} 著
      </b-card-text>

      <!-- ボタン -->
      <b-button
        v-if="showListButton"
        @click="goMemoIndex()"
      >
        読書メモ一覧
      </b-button>

      <b-button
        v-if="showIndexButton"
        @click="$emit('add-reading-list', book.id)"
      >
        読んでるリストに追加する
      </b-button>

      <b-button
        v-if="showReadedButton"
        @click="$emit('back-reading-list', book.bookId, false)"
      >
        読んでるリストに追加する
      </b-button>

      <b-button
        v-if="showReadingButton"
        @click="$emit('add-readed-list', book.bookId, true)"
      >
        読んだリストに追加する
      </b-button>

      <b-button
        v-if="showListButton"
        @click="$emit('delete-list', book.bookId)"
      >
        削除
      </b-button>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import { apiGet } from '~/api/config';
export default {
  created: function() {},
  props: {
    book: {
      type: Object,
      required: true,
      default: {},
    },
  },
  data: function () {
    return {
      isShow: false
    }
  },
  computed: {
    showIndexButton() {
      return this.$route.path === '/';
    },
    showReadingButton() {
      return this.$route.path === '/list/reading';
    },
    showReadedButton() {
      return this.$route.path === '/list/readed';
    },
    showListButton() {
      return this.$route.path === '/list/reading' || this.$route.path === '/list/readed';
    },
},
  methods:{
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    goMemoIndex() {
      const url = '/book/' + this.book.bookId + '/memo'
      this.$router.push({ path: url, query: { id: this.book.id } });
    }
  }
}
</script>

<style></style>
<template>
  <div>
    <b-card
      :title="book.title"
      img-top
      tag="article"
    >
      <b-card-img :src="imageUrl()" class="image-size"></b-card-img>
      <b-card-text v-if="book.author">
        {{book.author}} 著
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
        @click="$emit('add-reading-list', book)"
      >
        読んでるリストに追加する
      </b-button>

      <b-button
        v-if="showReadedButton"
        @click="$emit('back-reading-list', book.id, false)"
      >
        読んでるリストに追加する
      </b-button>

      <b-button
        v-if="showReadingButton"
        @click="$emit('add-readed-list', book.id, true)"
      >
        読んだリストに追加する
      </b-button>

      <b-button
        v-if="showListButton"
        @click="$emit('delete-list', book.id)"
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
      return this.$route.path === '/book/create/search';
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
    imageUrl() {
      if (this.book.image) {
        return this.book.image;
      } else if (this.book.mediumImageUrl) {
        return this.book.mediumImageUrl;
      }
    },
    goMemoIndex() {
      const url = '/book/' + this.book.bookId + '/memo'
      this.$router.push({ path: url, query: { id: this.book.id } });
    }
  }
}
</script>

<style>
.image-size {
  width: 128px;
  height: 128px;
}
</style>
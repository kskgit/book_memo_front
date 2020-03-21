<template>
<div class="container">
  <b-card
    :title="item.volumeInfo.title"
    :img-src="imageUrl(item)"
    img-height = '200'
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

    <!-- ボタン -->
    <b-button
      v-if="showIndexButton"
      @click="$emit('add-reading-list', item.id)"
    >
      読んでるリストに追加する
    </b-button>

    <b-button
      v-if="showReadButton"
      @click="$emit('back-reading-list', item.bookId, false)"
    >
      読んでるリストに追加する
    </b-button>

    <b-button
      v-if="showReadingButton"
      @click="goMemoIndex()"
    >
      読書メモ一覧
    </b-button>

    <b-button
      v-if="showReadingButton"
      @click="$emit('add-read-list', item.bookId, true)"
    >
      読んだリストに追加する
    </b-button>

    <b-button
      v-if="showListButton"
      @click="$emit('delete-list', item.bookId)"
    >
      削除
    </b-button>
  </b-card>
</div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import { apiGet } from '~/api/config';
export default {
  created: function() {},
  props: {
    item: {
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
      return this.$route.path === '/list' && !this.$store.getters['getIsReaded'];
    },
    showReadButton() {
      return this.$route.path === '/list' && this.$store.getters['getIsReaded'];
    },
    showListButton() {
      return this.$route.path === '/list';
    },
},
  methods:{
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    goMemoIndex() {
      const url = 'book/' + this.item.bookId + '/memo'
      this.$router.push({ path: url, query: { id: this.item.id } });
    }
  }
}
</script>

<style></style>
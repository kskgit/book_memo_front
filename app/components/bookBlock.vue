<template>
  <div>
    <b-card
      img-top
      tag="article"
      align="center"
    >
      <!-- バッジ -->
      <b-badge pill v-if="showInReaded" variant="success" style="text-align:left; display:block; width:100px;">
        <b-icon-check/>
        読んだ本
      </b-badge>
      <b-badge pill v-if="showInReading" variant="info" style="text-align:left; display:block; width:100px;">
        <b-icon-eye/>
        読んでる本
      </b-badge>

      <!-- タイトル -->
      <b-card-header header-tag="h4" class="mt-3">
        <b-card-text>
          {{book.title}}
        </b-card-text>
      </b-card-header>

      <!-- 画像 -->
      <b-card-body body-text-variant="secondary">
        <b-card-img :src="imageUrl()" class="image-size"></b-card-img>

      </b-card-body>

      <!-- 著者名 -->
      <b-card-footer footer-text-variant="secondary"  v-if="book.author" class="mb-3">
        <b-card-text>
          {{book.author}} 著
        </b-card-text>
      </b-card-footer>


      <!-- ボタン -->
      <b-button
        v-if="showInReadingAndReaded"
        @click="goMemoIndex()"
        variant="outline-secondary"
        class="mb-3"
      >
        ページ数を入力する
        <b-icon-pen/>
      </b-button>

      <b-button
        v-if="showInSearch"
        @click="$emit('add-reading-list', book)"
        variant="outline-primary"
      >
        読んでるリストに追加する
        <b-icon-plus/>
      </b-button>

      <b-button
        v-if="showInReaded"
        @click="$emit('back-reading-list', book.id, false)"
        variant="outline-primary"
        class="mb-3"
      >
        読んでるリストに追加する
        <b-icon-plus/>
      </b-button>

      <b-button
        v-if="showInReading"
        @click="$emit('add-readed-list', book.id, true)"
        variant="outline-primary"
        class="mb-3"
      >
        読んだリストに追加する
        <b-icon-plus/>
      </b-button>

      <b-button
        v-if="showInReadingAndReaded"
        @click="$emit('delete-list', book.id)"
        variant="outline-danger"
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
    showInSearch() {
      return this.$route.path === '/book/create/search';
    },
    showInReading() {
      return this.$route.path === '/list/reading';
    },
    showInReaded() {
      return this.$route.path === '/list/readed';
    },
    showInReadingAndReaded() {
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
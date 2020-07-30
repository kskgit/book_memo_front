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
        <b-icon-book/>
        読んでる本
      </b-badge>
      <h5 v-if="showInReading" style="text-align:left;">
        <b-badge variant="info">現在{{pageNumber}}ページ</b-badge>
      </h5>

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
        v-if="showInReading"
        v-b-modal.input-page-number
        variant="outline-secondary"
        class="mb-3"
      >
        ページ数を入力する
        <b-icon-pen/>
      </b-button>

      <b-modal id="input-page-number" title="ページ数を入力して下さい" hide-footer>
        <input
          type="number"
          class="mb-3 page-number-input"
          @input="$emit('update:pageNumber', $event.target.value)"
          :value="pageNumber"
        />
        <b-button
          @click="updatePageNumber(book.id)"
          variant="outline-primary"
          :disabled="!pageNumber && pageNumber "
        >
          更新
        </b-button>
        <b-button
          variant="outline-secondary"
          @click="$bvModal.hide('input-page-number')"
        >
          キャンセル
        </b-button>
      </b-modal>

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
        v-if="showInReading || showInReaded"
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

export default {
  created: function() {},
  props: {
    book: {
      type: Object,
      required: true,
      default: {},
    },
    pageNumber: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data: function () {
    return {
      isShow: false,
    }
  },
  computed: {
    showInSearch() {
      return this.$route.path === '/book/create/search' || this.$route.path === '/book/create/search/';
    },
    showInReading() {
      return this.$route.path === '/list/reading' || this.$route.path === '/list/reading/';
    },
    showInReaded() {
      return this.$route.path === '/list/readed' || this.$route.path === '/list/readed/';
    },
  },
  methods:{
    imageUrl() {
      if (this.book.image) {
        return this.book.image;
      } else if (this.book.largeImageUrl) {
        return this.book.largeImageUrl;
      }
    },
    updatePageNumber(bookId) {
      this.$bvModal.hide('input-page-number')
      this.$emit('update-page-number', bookId, this.pageNumber)
    }
  }
}
</script>

<style>
.image-size {
  width: 200px;
  height: 200px;
}
.page-number-input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
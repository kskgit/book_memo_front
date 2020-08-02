<template>
  <div>
    <b-card img-top tag="article" align="center">
      <!-- バッジ -->
      <b-badge
        v-if="showInReaded"
        pill
        variant="success"
        style="text-align: left; display: block; width: 100px;"
      >
        <b-icon-check />
        読んだ本
      </b-badge>
      <b-badge
        v-if="showInReading"
        pill
        variant="info"
        style="text-align: left; display: block; width: 100px;"
      >
        <b-icon-book />
        読んでる本
      </b-badge>
      <h5 v-if="showInReading" style="text-align: left;">
        <b-badge variant="info"> 現在{{ book.page_number }}ページ </b-badge>
      </h5>

      <!-- タイトル -->
      <b-card-header header-tag="h4" class="mt-3">
        <b-card-text>
          {{ book.title }}
        </b-card-text>
      </b-card-header>

      <!-- 画像 -->
      <b-card-body body-text-variant="secondary">
        <b-card-img :src="imageUrl()" class="image-size" />
      </b-card-body>

      <!-- 著者名 -->
      <b-card-footer
        v-if="book.author"
        footer-text-variant="secondary"
        class="mb-3"
      >
        <b-card-text> {{ book.author }} 著 </b-card-text>
      </b-card-footer>

      <!-- ボタン -->
      <b-button
        v-if="showInReading"
        v-b-modal="`input-page-number-${bookIndex}`"
        variant="outline-secondary"
        class="mb-3"
      >
        ページ数を入力する
        <b-icon-pen />
      </b-button>

      <b-modal
        :id="`input-page-number-${bookIndex}`"
        title="ページ数を入力して下さい"
        hide-footer
      >
        <b-input v-model="inputPageNumber" type="number" class="mb-3" />
        <b-button
          variant="outline-primary"
          :disabled="!inputPageNumber"
          @click="changePageNumber"
        >
          更新
        </b-button>
        <b-button
          variant="outline-secondary"
          @click="$bvModal.hide(`input-page-number-${bookIndex}`)"
        >
          キャンセル
        </b-button>
      </b-modal>

      <b-button
        v-if="showInSearch"
        variant="outline-primary"
        @click="$emit('add-reading-list', book)"
      >
        読んでるリストに追加する
        <b-icon-plus />
      </b-button>

      <b-button
        v-if="showInReaded"
        variant="outline-primary"
        class="mb-3"
        @click="$emit('back-reading-list', book.id, false)"
      >
        読んでるリストに追加する
        <b-icon-plus />
      </b-button>

      <b-button
        v-if="showInReading"
        variant="outline-primary"
        class="mb-3"
        @click="$emit('add-readed-list', book.id, true)"
      >
        読んだリストに追加する
        <b-icon-plus />
      </b-button>

      <b-button
        v-if="showInReading || showInReaded"
        variant="outline-danger"
        @click="$emit('delete-list', book.id)"
      >
        削除
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    bookIndex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: function () {
    return {
      isShow: false,
      inputPageNumber: 0,
    }
  },
  computed: {
    showInSearch() {
      return (
        this.$route.path === "/book/create/search" ||
        this.$route.path === "/book/create/search/"
      )
    },
    showInReading() {
      return (
        this.$route.path === "/list/reading" ||
        this.$route.path === "/list/reading/"
      )
    },
    showInReaded() {
      return (
        this.$route.path === "/list/readed" ||
        this.$route.path === "/list/readed/"
      )
    },
  },
  created: function () {
    this.setInputPageNumber()
  },
  methods: {
    imageUrl() {
      if (this.book.image) {
        return this.book.image
      } else if (this.book.largeImageUrl) {
        return this.book.largeImageUrl
      }
    },
    changePageNumber() {
      this.$bvModal.hide(`input-page-number-${this.bookIndex}`)
      this.$emit(
        "update-page-number",
        this.book.id,
        this.inputPageNumber,
        this.bookIndex
      )
    },
    setInputPageNumber() {
      this.inputPageNumber = this.book.page_number
    },
  },
}
</script>

<style>
.image-size {
  width: auto;
  height: auto;
}
</style>

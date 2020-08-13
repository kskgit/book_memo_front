<template>
  <div>
    <b-breadcrumb :items="breadcrumbItems" />
    <b-alert
      v-if="dbBooks.length == 0 && finishInitialize"
      show
      variant="warning"
    >
      読んでる本はありません
    </b-alert>
    <b-row>
      <b-col
        v-for="(book, index) in dbBooks"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <BookBlock
          ref="bookBlock"
          :book="book"
          :book-index="index"
          @add-readed-list="addReadedList"
          @delete-list="deleteList"
          @update-page-number="updatePageNumber"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import BookBlock from "@/components/BookBlock.vue"
export default {
  components: { BookBlock },
  data: function () {
    return {
      dbBooks: [],
      finishInitialize: false,
      breadcrumbItems: [
        {
          text: "トップ",
          to: "/",
        },
        {
          text: "読んでる本",
          active: true,
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created: async function () {
    await this.getIndex()
    this.finishInitialize = true
  },
  methods: {
    // 一覧取得
    async getIndex() {
      // 初期化
      this.dbBooks = []
      const res = await this.$store.dispatch("bookList/getDbBooks", {
        isReaded: false,
        uid: localStorage.getItem("uid"),
      })
      if (res.status === 200) {
        this.dbBooks = res.data
      } else {
        this.$router.push("/error")
      }
    },
    // ステータス更新
    async addReadedList(bookId, isReaded) {
      const res = await this.$store.dispatch("bookList/updateReadStatus", {
        bookId: bookId,
        isReaded: isReaded,
      })
      if (res.status === 204) {
        this.$router.push("/list/readed")
      } else {
        this.$router.push("/error")
      }
    },
    // ページ数更新
    async updatePageNumber(bookId, inputPageNumber, index) {
      const res = await this.$store.dispatch("bookList/updatePageNumber", {
        bookId: bookId,
        pageNumber: inputPageNumber,
      })
      if (res.status === 204) {
        this.dbBooks[index].page_number = res.data.page_number
        this.$refs.bookBlock[index].setInputPageNumber()
      } else {
        this.$router.push("/error")
      }
    },
    // 削除
    async deleteList(bookId) {
      const res = await this.$store.dispatch("bookList/deleteList", {
        bookId: bookId,
      })
      if (res.status === 204) {
        this.getIndex()
      } else {
        this.$router.push("/error")
      }
    },
  },
}
</script>

<style></style>

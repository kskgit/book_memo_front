<template>
  <div>
    <b-breadcrumb :items="breadcrumbItems" />
    <b-alert
      v-if="dbBooks.length == 0 && finishInitialize"
      show
      variant="warning"
    >
      読んだ本はありません
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
          :book="book"
          @back-reading-list="backReadingList"
          @delete-list="deleteList"
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
          text: "読んだ本",
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
        isReaded: true,
        uid: localStorage.getItem("uid"),
      })
      if (res.status === 200) {
        this.dbBooks = res.data
      } else {
        this.$router.push("/error")
      }
    },
    // ステータス更新
    async backReadingList(bookId, isReaded) {
      const res = await this.$store.dispatch("bookList/updateReadStatus", {
        bookId: bookId,
        isReaded: isReaded,
      })
      if (res.status === 204) {
        this.$router.push("/list/reading")
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

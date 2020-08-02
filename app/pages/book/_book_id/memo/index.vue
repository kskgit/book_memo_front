<template>
  <div v-if="isShow">
    <p>{{ book.volumeInfo.title }}</p>
    <p>{{ book.volumeInfo.subtitle }}</p>
    <b-button @click="goCreate()">
      読書メモを追加する
    </b-button>
    <b-table striped hover :items="histories" />
  </div>
</template>

<script>
import axios from "axios"

export default {
  components: {},
  data() {
    return {
      histories: [],
      book: {},
      isShow: false,
    }
  },
  created: async function () {
    await this.getBook()
    await this.getHistories()
    this.isShow = true
  },
  methods: {
    async getBook() {
      return new Promise(
        function (onFulfilled, onRejected) {
          axios
            .get(
              `https://www.googleapis.com/books/v1/volumes/${this.$route.query.id}`
            )
            .then((res) => {
              this.book = res.data
              return onFulfilled("success")
            })
            .catch((res) => {
              return onRejected("error")
            })
        }.bind(this)
      )
    },
    getHistories() {
      const url = "histories/" + this.$route.params.book_id
      apiGet(url).then((res) => {
        this.histories = res.data
      })
    },
    goCreate() {
      const url = "/book/" + this.$route.params.book_id + "/memo/create"
      this.$router.push({ path: url, query: { id: this.book.id } })
    },
  },
}
</script>

<style></style>

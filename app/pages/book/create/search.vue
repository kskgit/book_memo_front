<template>
  <div>
    <b-row>
      <b-col cols="6">
        <b-input
          id="inline-form-input-name"
          v-model="searchWord"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
          @keyup.enter="getResult(true)"
        />
      </b-col>
      <b-col cols="3">
        <b-button
          class="mb-2 mr-sm-2 mb-sm-0"
          variant="primary"
          @click="getResult(true)"
        >
          検索
        </b-button>
      </b-col>
      <b-col cols="3">
        <b-button
          class="mb-2 mr-sm-2 mb-sm-0"
          variant="outline-dark"
          @click="$router.push('/book/create')"
        >
          戻る
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-if="pageNationItems.totalRows > 0"
          v-model="pageNationItems.currentPage"
          :total-rows="pageNationItems.totalRows"
          :per-page="pageNationItems.perPage"
          aria-controls="my-table"
          class="mt-3"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="(book, index) in raBooks"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <BookBlock :book="book.Item" @add-reading-list="addReadingList" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-if="pageNationItems.totalRows > 0"
          v-model="pageNationItems.currentPage"
          :total-rows="pageNationItems.totalRows"
          :per-page="pageNationItems.perPage"
          aria-controls="my-table"
          class="mt-3"
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
      searchWord: "",
      raBooks: "",
      pageNationItems: {
        currentPage: 1,
        totalRows: 0,
        perPage: 1,
      },
    }
  },
  computed: {},
  watch: {
    "pageNationItems.currentPage": async function () {
      await this.getResult()
    },
  },
  methods: {
    async getResult(research = false) {
      const query = {
        keyword: this.searchWord,
        page: this.pageNationItems.currentPage,
      }
      const res = await this.$searchByRakutenBookAPI(query)
      this.raBooks = res.data.Items
      this.pageNationItems.totalRows = res.data.pageCount
      if (research) {
        this.pageNationItems.currentPage = 1
      }
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail
      }
    },
    async addReadingList(book) {
      const res = await this.$store.dispatch("bookList/createBookList", book)
      if (res.status === 201) {
        this.$router.push("/list/reading")
      } else {
        this.$router.push("/error")
      }
    },
  },
}
</script>

<style></style>

<template>
  <div>
    <b-breadcrumb :items="breadcrumbItems" />
    <b-row>
      <b-col cols="6">
        <b-input
          id="inline-form-input-name"
          v-model="searchWord"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
          @keypress="canStartSearch = true"
          @keyup.enter="getResult(true)"
        />
      </b-col>
      <b-col cols="6">
        <b-button
          class="mb-2 mr-sm-2 mb-sm-0"
          variant="primary"
          :disabled="!searchWord"
          @click="searchByButton(true)"
        >
          検索
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
          align="fill"
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
          align="fill"
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
      canStartSearch: false,
      breadcrumbItems: [
        {
          text: "トップ",
          to: "/",
        },
        {
          text: "本を追加する",
          to: "/book/create",
        },
        {
          text: "検索して登録する",
          active: true,
        },
      ],
    }
  },
  computed: {},
  watch: {
    "pageNationItems.currentPage": async function () {
      this.canStartSearch = true
      await this.getResult()
    },
  },
  methods: {
    async searchByButton(research = false) {
      this.canStartSearch = true
      this.getResult(research)
    },
    async getResult(research = false) {
      // 日本語変換対策
      if (!this.canStartSearch) {
        return
      }
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
      this.canStartSearch = false
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

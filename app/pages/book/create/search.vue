<template>
  <div>
    <b-row cols="8">
      <b-col>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
          v-model="searchWord"
          @keyup.enter="getResult(true)"
        ></b-input>
      </b-col>
      <b-col cols="4">
        <b-button
          class="mb-2 mr-sm-2 mb-sm-0"
          variant="primary"
          @click="getResult(true)"
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
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="12" sm="6" lg="4"
        v-for="(book, index) in raBooks" :key="index"
      >
        <BookBlock
          :book="book.Item"
          @add-reading-list = "addReadingList"
        ></BookBlock>
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
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import BookBlock from '@/components/BookBlock.vue';
import { apiPost } from '~/api/config';
import BookList from '@/service/BookList'
export default {
  components: { BookBlock },
  data: function () {
    return {
      searchWord: '',
      raBooks: '',
      pageNationItems: {
        currentPage: 1,
        totalRows: 0,
        perPage: 1
      }
    }
  },
  computed: {},
  watch: {
    'pageNationItems.currentPage': async function(){
      await this.getResult()
    },
  },
  methods:{
    async getResult(research = false){
      const query = {
        keyword: this.searchWord,
        page: this.pageNationItems.currentPage
      }
      const res = await this.$searchByRakutenBookAPI(query);
      this.raBooks = res.data.Items
      this.pageNationItems.totalRows = res.data.pageCount
      if(research) {
        this.pageNationItems.currentPage = 1
      }
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    async addReadingList(book) {
      await this.$store.dispatch('bookList/createBookList', book)
      this.$router.push('/list/reading');
    },
  }
}
</script>

<style></style>

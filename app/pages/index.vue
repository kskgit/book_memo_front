<template>
  <div>
    <b-row cols="8">
      <b-col>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
          v-model="searchWord"
          @keypress="getResult"
        ></b-input>
      </b-col>
      <b-col cols="4">
        <b-button
          class="mb-2 mr-sm-2 mb-sm-0"
          variant="primary"
          @click="getResult"
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
          @click="changePage"
          class="mt-3"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="12" sm="6" lg="4"
        v-for="(book, index) in raBooks" :key="index"
      >
        <bookBlock
          :book="book.Item"
          @add-reading-list = "addReadingList"
        ></bookBlock>
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
          @click="changePage"
          class="mt-3"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import bookBlock from '@/components/bookBlock.vue';
import { apiPost } from '~/api/config';
import BookList from '@/service/BookList'
export default {
  components: { bookBlock },
  data: function () {
    return {
      searchWord: '',
      raBooks: '',
      pageNationItems: {
        currentPage: 1,
        totalRows: 0,
        perPage: 5
      }
    }
  },
  computed: {},
  watch: {
    'pageNationItems.currentPage': function(){
      this.getResult()
    },
  },
  methods:{
    async getResult(){
      const query = {
        keyword: this.searchWord,
        page: this.pageNationItems.currentPage
      }
      const res = await this.$searchRyRakutenBookAPI(query);
      this.raBooks = res.data.Items
      this.pageNationItems.totalRows = res.data.pageCount
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    async addReadingList(book) {
      await BookList.createBookList(book);
      this.$router.push('/list/reading');
    },
    changePage() {
      this.getResult()
    }
  }
}
</script>

<style></style>

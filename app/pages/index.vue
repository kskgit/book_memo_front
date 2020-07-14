<template>
<div>
  <b-col cols="8">
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="タイトル"
      v-model="query"
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
      query: '',
      raBooks: '',
    }
  },
  computed: {},
  methods:{
    async getResult(){
      const res = await this.$serchRyRakutenBookAPI(this.query);
      this.raBooks = res.data.Items
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    async addReadingList(book) {
      await BookList.createBookList(book);
      this.$router.push('/list/reading');
    }
  }
}
</script>

<style></style>

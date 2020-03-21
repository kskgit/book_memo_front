<template>
<div class="container">
  <Header />
  <b-form class="m-1" inline>
    <b-col cols="8">
      <b-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="タイトル"
        v-model="query"
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
  </b-form>
  <b-row>
    <b-col
      cols="12" sm="6" lg="4"
      v-for="(item, index) in items" :key="index"
    >
      <bookBlock
        :item="item"
        @add-reading-list = "addReadingList"
      ></bookBlock>
    </b-col>
  </b-row>

</div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import bookBlock from '@/components/bookBlock.vue';
import { apiPost } from '~/api/config';
export default {
  components: { Header,bookBlock },
  data: function () {
    return {
      query: '',
      items: '',
    }
  },
  computed: {},
  methods:{
    getResult(){
      axios.get("https://www.googleapis.com/books/v1/volumes?q=search" + this.query + "&maxResults=40").then(response => {
        this.items = response.data.items;
      });
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    addReadingList(volumeId) {
      const url = 'books';
      const params = {
        volume_id: volumeId
      }
      apiPost(url, params).then(res => {
        if (res.status = 201) {
          this.$router.push('/reading');
        }
      });
    }
  }
}
</script>

<style></style>

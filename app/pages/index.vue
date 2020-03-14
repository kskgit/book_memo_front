<template>
<div class="container">
  <b-form inline>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="タイトル"
      v-model="query"
    ></b-input>

    <b-button variant="primary" @click="getResult">検索</b-button>
  </b-form>
  <b-row>
    <b-col cols="12" sm="6" lg="4" v-for="(item, index) in items" :key="index">
      <b-card
        :title="item.volumeInfo.title"
        :img-src="imageUrl(item)"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
      >
        <b-card-text v-if="item.volumeInfo.subtitle">
          {{item.volumeInfo.subtitle}}
        </b-card-text>
        <b-card-text v-for="(author, authorIndex) in item.volumeInfo.authors" :key="authorIndex">
          {{author}} 著
        </b-card-text>

        <b-button href="#" variant="primary" @click="addReadingList(item)">読んでるリストに追加する</b-button>
      </b-card>
    </b-col>
  </b-row>

</div>
</template>

<script>
import axios from 'axios';
import { apiPost } from '~/api/config';
export default {
  components: {},
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
      // id検索
      axios.get("https://www.googleapis.com/books/v1/volumes/L2FyQgAACAAJ").then(response => {
        this.items = response.data.items;
      });
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    },
    addReadingList(book) {
      console.log('追加', book);
      const url = 'books';
      const params = {
        volume_id: book.id
      }
      apiPost(url, params);
    }
  }
}
</script>

<style></style>

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
  <div v-for="(item, index) in items" :key="index">>
    <b-card
      :title="item.volumeInfo.title"
      :img-src="imageUrl(item)"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import { apiGet } from '~/api/config';
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
      axios.get("https://www.googleapis.com/books/v1/volumes?q=search" + this.query).then(response => {
        console.log(response.data);
        this.items = response.data.items;
      });
    },
    imageUrl(book) {
      if (book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    }
  }
}
</script>

<style></style>

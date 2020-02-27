<template>
<div class="container">
  <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Jane Doe"
      v-model="query"
    ></b-input>

    <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input id="inline-form-input-username" placeholder="Username"></b-input>
    </b-input-group>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>

    <b-button variant="primary" @click="getResult">Save</b-button>
  </b-form>
</div>
</template>

<script>
import { apiGet } from '~/api/config';
export default {
  components: {},
  data: function () {
    return {
      query: ''
    }
  },
  methods:{
    getResult(paramsData = {}){
      const params = paramsData;
      const url = `https://www.googleapis.com/books/v1/volumes?q=search`;
      apiGet( + this.query).then(response => {
        console.log(response.data);
        this.items = response.data.items;
      });
    }
  }
}
</script>

<style></style>

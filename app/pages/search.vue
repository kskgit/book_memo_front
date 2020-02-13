<template>
  <div>
    <input type="text" @input="searchBooks" />
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      items: []
    }
  },
  computed: {},
  methods: {
    searchBooks() {
      console.log(this.$api);
      // axios.get("https://www.googleapis.com/books/v1/volumes?q=search" + query).then(response => {
      //   console.log(response.data);
      //   this.items = response.data.items;
      //   });
    }
  },
  created: async function() {}
}
</script>
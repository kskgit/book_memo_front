<template>
  <div v-if="showLoading" class="d-flex justify-content-center loading-box">
    <b-spinner
      style="width: 3rem; height: 3rem;"
      label="Large Spinner"
      variant="info"
      class="loading-item"
    />
  </div>
</template>
<script>
export default {
  computed: {
    showLoading() {
      return this.$store.getters["loading/showLoading"]
    },
  },
}
</script>
<style scoped>
.loading-box {
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-color: white;
}
.loading-item {
  margin-top: 50%;
}
@media screen and (min-width: 1200px) {
  .loading-item {
    margin-top: 20%;
  }
}
</style>

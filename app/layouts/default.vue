<template>
  <div class="default-color">
    <Header class="common-header" />
    <b-container>
      <nuxt />
      <Loading />
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Loading from "@/components/Loading.vue"
export default {
  components: { Header, Loading },
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.common-header {
  margin-bottom: 20px;
}
body {
  background: #ffffee;
}
</style>

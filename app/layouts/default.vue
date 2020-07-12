<template>
  <div class="top-container">
    <Header/>
    <b-container>
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  components: { Header },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.top-container {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>

<template>
  <div>
    <b-button
      block
      size="lg"
      variant="primary"
      class="text-white"
      @click="$router.push('/book/create/input')"
      v-b-popover.hover.bottom="'本のバーコードから情報を読み取って登録します'"
    >
      <h3>バーコードを読み取って登録する</h3>
    </b-button>
    <b-button
      block
      size="lg"
      variant="primary"
      class="text-white mt-3"
      @click="$router.push('/book/create/search')"
      v-b-popover.hover.bottom="'タイトルから本を検索して登録します'"
    >
      <h3>検索して登録する</h3>
    </b-button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  computed: {},
  watch: {},
  methods:{}
}
</script>

<style></style>
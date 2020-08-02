<template>
  <div>
    <b-button
      v-b-popover.hover.bottom="'本のバーコードから情報を読み取って登録します'"
      block
      size="lg"
      variant="outline-primary"
      @click="$router.push('/book/create/input')"
    >
      <h3>バーコードを読み取って登録する</h3>
    </b-button>
    <b-button
      v-b-popover.hover.bottom="'タイトルから本を検索して登録します'"
      block
      size="lg"
      variant="outline-info"
      @click="$router.push('/book/create/search')"
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
  methods: {},
}
</script>

<style></style>

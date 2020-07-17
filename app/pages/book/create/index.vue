<template>
  <div>
    <b-button
      block
      size="lg"
      variant="primary"
      class="text-white"
      v-b-popover.hover.bottom="'本のバーコードから情報を読み取って登録します'"
    >
      <h3>バーコード読み取り</h3>
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
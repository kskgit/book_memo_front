<template>
  <div>
    <b-breadcrumb :items="breadcrumbItems" />
    <b-button
      v-b-popover.hover.bottom="'本のバーコードから情報を読み取って登録します'"
      block
      size="lg"
      variant="info"
      @click="$router.push('/book/create/input')"
    >
      <h3>バーコードを読み取って登録する</h3>
    </b-button>
    <b-button
      v-b-popover.hover.bottom="'タイトルから本を検索して登録します'"
      block
      size="lg"
      variant="info"
      @click="$router.push('/book/create/search')"
    >
      <h3>検索して登録する</h3>
    </b-button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      breadcrumbItems: [
        {
          text: "トップ",
          to: "/",
        },
        {
          text: "本を追加する",
          active: true,
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style></style>

<template>
  <div>
    <b-breadcrumb :items="breadcrumbItems" />
    <b-button
      block
      size="lg"
      variant="info"
      @click="$router.push('/book/create/input')"
    >
      <h4>
        <b-icon-upc-scan />
        バーコードを読み取って登録する
      </h4>
    </b-button>
    <b-button
      block
      size="lg"
      variant="info"
      @click="$router.push('/book/create/search')"
    >
      <h4>
        <b-icon-search />
        検索して登録する
      </h4>
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

<template>
  <div>
    <b-button
      block
      size="lg"
      variant="info"
      @click="$router.push('/book/create/')"
    >
      <h3>本を追加する<b-icon-plus class="ml-2" /></h3>
    </b-button>
    <b-button
      block
      size="lg"
      variant="info"
      @click="$router.push('/list/reading')"
    >
      <h3>読んでる本<b-icon-book class="ml-2" /></h3>
    </b-button>
    <b-button
      v-b-popover.hover.bottom="'本のバーコードから情報を読み取って登録します'"
      block
      size="lg"
      variant="info"
      @click="$router.push('/list/readed')"
    >
      <h3>読んだ本<b-icon-check /></h3>
    </b-button>
  </div>
</template>

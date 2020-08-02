<template>
  <div>
    <b-alert variant="danger" show>エラーが発生しました</b-alert>
    <b-button
      block
      size="lg"
      variant="danger"
      @click="$router.push('/')"
    >
      <h3>トップページへ戻る</h3>
    </b-button>
  </div>
</template>
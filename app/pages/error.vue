<template>
  <div>
    <b-alert variant="danger" show>
      エラーが発生しました
    </b-alert>
    <b-button block size="lg" variant="info" @click="$router.push('/')">
      <h4>トップページへ戻る</h4>
    </b-button>
  </div>
</template>

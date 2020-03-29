<template>
  <div class="signup">
    <h2>Sign up</h2>
    <div style="width:500px">
      <div class="row align-items-center">
        <div class="col-md-4">アカウント名</div>
        <div class="col-md-3">
          <input type="text" placeholder="Username" v-model="username">
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-4">パスワード</div>
        <div class="col-md-3">
          <input type="password" placeholder="Password" v-model="password">
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-12">
          <button class="btn btn-primary" @click="signup">signup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
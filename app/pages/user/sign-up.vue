<template>
  <div class="signup">
    <b-row>
      <b-col>メールアドレス</b-col>
      <b-form-input
        v-model="email"
        placeholder="Email"
        class="input-text ml-3 mr-3"
      />
    </b-row>
    <b-row class="mt-3">
      <b-col>パスワード</b-col>
      <b-form-input
        v-model="password"
        placeholder="パスワード"
        class="input-text ml-3 mr-3"
        type="password"
      />
    </b-row>
    <b-button class="mt-3" @click="signup()">
      アカウント作成
    </b-button>
    <b-alert v-if="showErrorMessage" variant="danger" show class="mt-3">
      ログインに失敗しました
    </b-alert>
    <b-row class="mt-3">
      <b-col>
        >
        <nuxt-link to="/user/login">
          ログイン
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios"
import firebase from "~/plugins/firebaseConfig"
export default {
  data: function () {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          localStorage.setItem("uid", user.user.uid)
          this.$router.push("/")
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
        })
    },
  },
}
</script>
<style></style>

<template>
  <div>
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
        @keypress.enter="signIn()"
      />
    </b-row>
    <b-button class="mt-3" @click="signIn()">
      ログイン
    </b-button>
    <b-alert v-if="showErrorMessage" variant="danger" show class="mt-3">
      ログインに失敗しました
    </b-alert>
    <b-row class="mt-3">
      <b-col>
        <span>アカウントをお持ちで無い方は</span>
        <nuxt-link to="/user/sign-up">
          こちら
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import firebase from "~/plugins/firebaseConfig"

export default {
  data: function () {
    return {
      email: "",
      password: "",
      showErrorMessage: false,
    }
  },
  computed: {},
  watch: {},
  created: function () {},
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          localStorage.setItem("uid", user.user.uid)
          this.$router.push("/")
        })
        .catch(() => {
          this.showErrorMessage = true
        })
    },
  },
}
</script>

<style></style>

<template>
  <div>
    <b-alert variant="secondary" show class="mt-3">
      アカウント新規作成
    </b-alert>
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="required|email">
        <b-row>
          <b-col>メールアドレス</b-col>
          <b-form-input
            v-model="email"
            placeholder="Email"
            class="input-text ml-3 mr-3"
          />
          <b-col>
            <span class="text-danger">{{ errors[0] }}</span>
          </b-col>
        </b-row>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|alpha_num|min:8">
        <b-row class="mt-3">
          <b-col>パスワード</b-col>
          <b-form-input
            v-model="password"
            placeholder="パスワード"
            class="input-text ml-3 mr-3"
            type="password"
          />
          <b-col>
            <span class="text-danger">{{ errors[0] }}</span>
          </b-col>
        </b-row>
      </ValidationProvider>
      <b-button class="mt-3" :disabled="invalid" @click="signup()">
        アカウント作成
      </b-button>
      <b-alert v-if="showErrorMessage" variant="danger" show class="mt-3">
        アカウント作成に失敗しました
      </b-alert>
      <b-row class="mt-3">
        <b-col>
          <nuxt-link to="/user/login">
            ログインページへ
          </nuxt-link>
        </b-col>
      </b-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate"
import firebase from "~/plugins/firebaseConfig"
export default {
  components: { ValidationProvider, ValidationObserver },
  data: function () {
    return {
      email: "",
      password: "",
      showErrorMessage: false,
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
        .catch(() => {
          this.showErrorMessage = true
        })
    },
  },
}
</script>
<style></style>

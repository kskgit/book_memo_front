<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="email">
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
      <ValidationProvider v-slot="{ errors }" rules="required">
        <b-row class="mt-3">
          <b-col>パスワード</b-col>
          <b-form-input
            v-model="password"
            placeholder="パスワード"
            class="input-text ml-3 mr-3"
            type="password"
            @keypress.enter="signIn()"
          />
          <b-col>
            <span class="text-danger">{{ errors[0] }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="mt-3" :disabled="invalid" @click="signIn()">
              ログイン
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <button
              type="button"
              class="buttonImage mt-3"
              @click="signInByGoogle()"
            >
              <img src="../../static/btn_google_signin_light_normal_web.png">
            </button>
          </b-col>
        </b-row>
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
      </ValidationProvider>
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
    signInByGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
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

<style>
.buttonImage {
  background-image: url("../../static/btn_google_signin_light_normal_web.png");
  background-repeat: no-repeat;
  border-style: none;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
}
</style>

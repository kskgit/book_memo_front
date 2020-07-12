<template>
  <div>
    <b-row>
      <b-col>メールアドレス</b-col>
      <b-form-input placeholder="Email" v-model="email" class="input-text ml-3 mr-3"/>
    </b-row>
    <b-row class="mt-3">
      <b-col>パスワード</b-col>
      <b-form-input placeholder="パスワード" v-model="password" class="input-text ml-3 mr-3" type="password" @keypress.enter="signIn()"/>
    </b-row>
    <b-button class="mt-3" @click="signIn()">ログイン</b-button>
    <b-alert v-if="showErrorMessage" variant="danger" show class="mt-3">ログインに失敗しました</b-alert>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from '~/plugins/firebaseConfig'

export default {
  created: function() {},
  data: function () {
    return {
      email: "",
      password: "",
      showErrorMessage: false
    }
  },
  watch: {},
  computed: {},
  methods:{
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(()=> {
        this.$router.push('/');
      }).catch((error) => {
        this.showErrorMessage = true
      });
    }

  }
}
</script>

<style></style>
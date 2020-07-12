<template>
  <div>
    <b-row>
      <b-col>メールアドレス</b-col>
      <b-form-input placeholder="Email" v-model="email" class="input-text ml-3 mr-3"></b-form-input>
    </b-row>
    <b-row class="mt-3">
      <b-col>パスワード</b-col>
      <b-form-input placeholder="パスワード" v-model="password" class="input-text ml-3 mr-3"></b-form-input>
    </b-row>
    <b-button class="mt-3" @click="login">ログイン</b-button>
    <b-alert v-if="showErrorMessage" variant="danger" show class="mt-3">ログインに失敗しました</b-alert>
  </div>


    <!-- <div>
      <div class="row align-items-center">
        <div class="col-md-4">メールアドレス</div>

      </div>
      <div class="row align-items-center">
        <div class="col-md-4">パスワード</div>
        <div class="col-md-3">
          <input type="password" placeholder="Password" v-model="password">
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-12">
          <button class="btn btn-primary" @click="signup">ログイン</button>
        </div>
      </div>
    </div> -->
</template>

<script>
import axios from 'axios';
import firebase from '~/plugins/firebaseConfig'
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

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
    login() {
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

<style>
/* .input-text {
  margin-left: 15px;
  margin-right: 15px;
} */
</style>
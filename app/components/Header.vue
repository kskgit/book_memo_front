<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">
        SHIORI
        <b-icon-book-half />
      </b-navbar-brand>

      <b-navbar-toggle v-if="showNavBar" target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/book/create">
            本を追加する
          </b-nav-item>
          <b-nav-item to="/list/reading">
            読んでる本
          </b-nav-item>
          <b-nav-item to="/list/readed">
            読んだ本
          </b-nav-item>
          <b-nav-item @click="logout()">
            ログアウト
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import firebase from "~/plugins/firebaseConfig"
export default {
  computed: {
    showIndexButton() {
      return this.$route.path === "/"
    },
    showNavBar() {
      return (
        this.$route.path !== "/user/sign-up" &&
        this.$route.path !== "/user/login"
      )
    },
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function () {
          localStorage.removeItem("uid")
          this.$router.push("/user/login")
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>

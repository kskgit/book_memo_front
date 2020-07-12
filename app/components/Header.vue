<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand href="#">Book Memo</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/">検索</b-nav-item>
					<b-nav-item to="/list/reading">読んでる本</b-nav-item>
					<b-nav-item to="/list/readed">読んだ本</b-nav-item>
          <b-nav-item @click="logout()">ログアウト</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import firebase from '~/plugins/firebaseConfig'
export default {
  computed: {
    showIndexButton() {
      return this.$route.path === '/';
    },
  },
  methods:{
    logout() {
      firebase.auth().signOut().then(function() {
        this.$router.push('/user/login')
      }).catch(function(error) {
        console.log(error)
      });
    }
	}
}
</script>

<style></style>

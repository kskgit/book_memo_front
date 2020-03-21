<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand href="#">Book Memo</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/">検索</b-nav-item>
					<b-nav-item @click="toList(false)">読んでる本</b-nav-item>
					<b-nav-item @click="toList(true)">読んだ本</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	methods:{
    // 一覧取得
		toList(isReaded) {
			this.$store.dispatch('setIsReaded', isReaded)
			this.$router.push('/list')
			if (this.$route.path === '/list') {
				this.$emit('get-index')
			}
		},
	}
}
</script>

<style></style>

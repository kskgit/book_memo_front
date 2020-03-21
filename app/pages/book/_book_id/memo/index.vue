<template>
  <div>
		<Header />
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { apiGet } from '~/api/config';
export default {
  components: { Header },
	data() {
		return {
			items: []
		}
	},
	created: function() {
		this.getIndex();
	},
	methods:{
		// 一覧取得
		async getIndex(){
			const url = 'histories/' + this.$route.params.book_id;
			let array = [];
			await apiGet(url).then(res => {
				this.items = res.data;
			})
		},
		}
	}
</script>

<style></style>

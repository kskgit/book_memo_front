<template>
  <div v-if="isShow">
		<Header />
    <p>{{book.volumeInfo.title}}</p>
    <p>{{book.volumeInfo.subtitle}}</p>
    <b-table striped hover :items="histories"></b-table>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import { apiGet } from '~/api/config';
export default {
  components: { Header },
	data() {
		return {
      histories: [],
      book: {},
      isShow: false
		}
	},
	created: async function() {
    await this.getBook();
    await this.getHistories();
    this.isShow = true;
	},
	methods:{
		async getBook() {
      return new Promise(function(onFulfilled, onRejected) {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${this.$route.query.id}`)
          .then(res => {
            this.book = res.data
            return onFulfilled('success');
          })
          .catch(res => {
            return onRejected('error');
          });
      }.bind(this))
    },
		getHistories(){
			const url = 'histories/' + this.$route.params.book_id;
			apiGet(url).then(res => {
				this.histories = res.data;
			})
		},
  }
}
</script>

<style></style>

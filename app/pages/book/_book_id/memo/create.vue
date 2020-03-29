<template>
  <div>
    <Header />
    <InputMemo
      v-bind:form.sync="form"
      @save = "onSubmit"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { apiPost } from '~/api/config';
import Header from '@/components/Header.vue';
import InputMemo from '@/components/InputMemo.vue';
export default {
  components: { Header,InputMemo },
  created: function() {
    this.form.book_id = this.$route.params.book_id;
  },
  data: function () {
    return {
      form : {
        book_id: 0,
        date: '',
        memo: '',
        page_number: 0,
      },
    }
  },
  methods:{
    onSubmit() {
      const url = '/histories';
      const params = {
        history_form: this.form
      }
      apiPost(url, params).then(res => {
        if (res.status === 201) {
          const redirect_url = `/book/${this.form.book_id}/memo`
          console.log('===this.$root.query.id', this.$route.query);
          this.$router.push({path: redirect_url, query: { id: this.$route.query.id }})
        }
      });
    },
  }
}
</script>

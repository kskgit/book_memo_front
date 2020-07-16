<template>
  <div>
    <b-row>
      <b-col>
        <input
          type="file"
          @change="addFile"
        />
      </b-col>
      <b-img :src="imageForDisplay" fluid alt="Responsive image"></b-img>
    </b-row>
    <b-row>
      <b-col>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
          v-model="book.title"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="著者"
          v-model="book.artistName"
        />
      </b-col>
    </b-row>
    <b-button
      class="mb-2 mr-sm-2 mb-sm-0"
      variant="primary"
      @click="addReadingList(true)"
    >
      保存
    </b-button>
  </div>
</template>

<script>
import axios from 'axios';
import { apiPost } from '~/api/config';
import BookList from '@/service/BookList'
export default {
  data: function () {
    return {
      searchWord: '',
      imageForDisplay: '',
      book: {
        artistName: '',
        title: '',
        imageFile: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods:{
    async addReadingList() {
      await BookList.createBookListByMultipartForm(this.book);
      this.$router.push('/list/reading');
    },
    addFile(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      const self = this
      reader.onload = (e) => {
        self.imageForDisplay = e.target.result
      }
      reader.readAsDataURL(file)
      this.book.imageFile = file
    }
  }
}
</script>

<style></style>

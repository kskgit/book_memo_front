<template>
  <div>
    <b-button
      @click="showScaner = true"
    >
      スキャン開始
    </b-button>
    <BarcodeScaner v-if="showScaner" @search-rakuten-api="searchRakutenApi"/>
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
import BookList from '@/service/BookList';
import BarcodeScaner from '@/components/BarcodeScaner';
export default {
  components: { BarcodeScaner },
  data: function () {
    return {
      searchWord: '',
      imageForDisplay: '',
      showScaner: false,
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
    },
    async searchRakutenApi(isbnCode) {
      const query = {
        isbnjan: isbnCode
      }
      const res = await this.$searchByRakutenBookAPI(query)
      this.showScaner = false
      this.imageForDisplay = res.data.Items[0].Item.largeImageUrl
      this.book.title = res.data.Items[0].Item.title
      this.book.artistName = res.data.Items[0].Item.author
    }
  }
}
</script>

<style></style>

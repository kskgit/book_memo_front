<template>
  <div>
    <b-form-group label="入力方法を選択して下さい">
      <b-form-radio v-model="inputMethod" value="barcode">バーコードスキャン</b-form-radio>
      <b-form-radio v-model="inputMethod" value="input">直接入力</b-form-radio>
    </b-form-group>

    <!-- バーコードスキャン -->
    <b-button
      @click="startScan()"
      v-if="inputMethod==='barcode' && !showScaner"
    >
      スキャン開始
    </b-button>
    <BarcodeScaner
      v-show="showScaner"
      ref="scaner"
      @search-rakuten-api="searchRakutenApi"
      @stop-scan="stopScan"
    />

    <!-- ファイル読込 -->
    <label v-if="inputMethod==='input'">
      <span class="btn btn-secondary">
          画像を設定する
          <input @change="addFile" type="file" style="display:none">
      </span>
    </label>

    <b-img class="mt-3" :src="imageForDisplay" v-if="imageForDisplay"></b-img>
    <b-row class="mt-3">
      <b-col>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
          v-model="book.title"
        />
      </b-col>
    </b-row>
    <b-row class="mt-3">
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
      class="mb-2 mr-sm-2 mb-sm-0 mt-3"
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
      },
      inputMethod: 'barcode'
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
    },
    startScan() {
      this.showScaner = true
      this.$refs.scaner.initQuagga();
    },
    stopScan(quagga) {
      this.showScaner = false
      quagga.stop();
    }
  }
}
</script>

<style></style>

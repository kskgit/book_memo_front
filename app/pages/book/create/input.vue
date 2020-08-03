<template>
  <div>
    <!-- バーコードスキャン -->
    <b-button
      v-if="inputMethod === 'barcode' && !showScaner"
      variant="outline-info"
      @click="startScan()"
    >
      スキャン開始
    </b-button>

    <BarcodeScaner
      v-show="showScaner"
      ref="scaner"
      @search-rakuten-api="searchRakutenApi"
      @stop-scan="stopScan"
      @set-input-method-input="setInputMethodInput"
    />

    <!-- ファイル読込 -->
    <label v-if="inputMethod === 'input'">
      <span class="btn btn-outline-info">
        画像を設定する
        <input type="file" style="display: none;" @change="addFile" />
      </span>
    </label>

    <b-button
      v-if="inputMethod === 'input'"
      variant="outline-dark"
      @click="setInputMethodBarcode()"
    >
      スキャンに戻る
    </b-button>

    <b-row class="mt-3">
      <b-col>
        <b-img v-if="imageForDisplay" class="mt-3" :src="imageForDisplay" />
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-input
          id="inline-form-input-name"
          v-model="book.title"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="タイトル"
        />
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-input
          id="inline-form-input-name"
          v-model="book.author"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="著者"
        />
      </b-col>
    </b-row>
    <b-button
      class="mb-2 mr-sm-2 mb-sm-0 mt-3"
      variant="outline-primary"
      @click="addReadingList()"
    >
      読んでるリストに追加する
      <b-icon-plus />
    </b-button>
  </div>
</template>

<script>
import BarcodeScaner from "@/components/BarcodeScaner"
export default {
  components: { BarcodeScaner },
  data: function () {
    return {
      searchWord: "",
      inputImage: "",
      showScaner: false,
      book: {
        author: "",
        title: "",
        imageFile: "",
      },
      inputMethod: "barcode",
    }
  },
  computed: {
    imageForDisplay() {
      if (this.inputMethod === "barcode" && this.book.largeImageUrl) {
        return this.book.largeImageUrl
      }
      if (this.inputMethod === "input" && this.inputImage) {
        return this.inputImage
      }
      return null
    },
  },
  watch: {},
  methods: {
    async addReadingList() {
      if (this.inputMethod === "barcode") {
        const res = await this.$store.dispatch(
          "bookList/createBookList",
          this.book
        )
        if (res.status === 201) {
          this.$router.push("/list/reading")
        } else {
          this.$router.push("/error")
        }
      }
      if (this.inputMethod === "input") {
        const res = await this.$store.dispatch(
          "bookList/createBookListByMultipartForm",
          this.book
        )
        if (res.status === 201) {
          this.$router.push("/list/reading")
        } else {
          this.$router.push("/error")
        }
      }
    },
    addFile(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      const self = this
      reader.onload = (e) => {
        self.inputImage = e.target.result
      }
      reader.readAsDataURL(file)
      this.book.imageFile = file
    },
    async searchRakutenApi(isbnCode) {
      const query = {
        isbnjan: isbnCode,
      }
      const res = await this.$searchByRakutenBookAPI(query)
      this.showScaner = false
      this.book = res.data.Items[0].Item
    },
    startScan() {
      this.showScaner = true
      this.$refs.scaner.initQuagga()
    },
    stopScan(quagga) {
      this.showScaner = false
      quagga.stop()
    },
    setInputMethodInput() {
      this.inputMethod = "input"
    },
    setInputMethodBarcode() {
      this.inputMethod = "barcode"
    },
  },
}
</script>

<style></style>

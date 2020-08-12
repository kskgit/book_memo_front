<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <b-row class="mt-3">
        <b-col>
          <b-icon-x-circle v-if="imageForDisplay" @click="clearBook()" />
          <b-img
            v-if="imageForDisplay"
            class="mt-3 mb-3 image-size"
            :src="imageForDisplay"
          />
          <b-img
            v-else-if="!showScaner"
            class="mt-3 mb-3 image-size"
            src="@/assets/m_e_others_500.jpg"
          />
        </b-col>
      </b-row>

      <!-- バーコードスキャン -->
      <b-button
        v-if="inputMethod === 'barcode' && !showScaner"
        variant="primary"
        @click="startScan()"
      >
        スキャン開始
      </b-button>

      <BarcodeScaner
        v-show="showScaner"
        ref="scaner"
        @search-rakuten-api="searchRakutenApi"
        @stop-scan="stopScan"
        @set-input-method="setInputMethod"
      />

      <!-- ファイル読込 -->
      <label v-if="inputMethod === 'input'">
        <span class="btn btn-primary">
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
          <ValidationProvider v-slot="{ errors }" rules="required">
            <b-input
              id="inline-form-input-name"
              v-model="book.title"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="タイトル"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
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
        variant="primary"
        :disabled="invalid"
        @click="addReadingList()"
      >
        読んでるリストに追加する
        <b-icon-plus />
      </b-button>
      <b-button
        class="mb-2 mr-sm-2 mb-sm-0 mt-3"
        variant="outline-dark"
        @click="$router.push('/book/create')"
      >
        戻る
      </b-button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate"
import BarcodeScaner from "@/components/BarcodeScaner"
export default {
  components: { BarcodeScaner, ValidationProvider, ValidationObserver },
  data: function () {
    return {
      searchWord: "",
      inputImage: "",
      showScaner: false,
      book: {},
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
      this.clearBook()
      this.showScaner = true
      this.$refs.scaner.initQuagga()
    },
    stopScan(quagga) {
      this.showScaner = false
      quagga.stop()
    },
    setInputMethod(quagga) {
      this.inputMethod = "input"
      quagga.stop()
    },
    setInputMethodBarcode() {
      this.inputMethod = "barcode"
    },
    clearBook() {
      if (this.book.largeImageUrl) {
        this.book = {}
      }
      if (this.inputImage) {
        this.inputImage = ""
      }
    },
  },
}
</script>

<style>
.image-size {
  width: auto;
  height: auto;
  max-width: 300px;
  max-height: 300px;
}
</style>

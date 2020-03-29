<template>
  <div class="container">
    <div v-if="imageUrl">
      <img :src="imageUrl" width="510px" height="276px" />
      <!-- 右下ボタン -->
      <div class="img_area_btn_wrap">
        <button @click="deleteImage">削除</button>
      </div>
    </div>
    <div v-else>
      <vue-dropzone
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="successMethod"
      >
      </vue-dropzone>
    </div>
  </div>
</template>

<script>
import { apiGet, apiDelete } from '~/api/config';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'app',
  created() {},
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
        url: `${process.env.API_BASE_URL}/users/1`,
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        paramName: 'image',
        method: 'put',
      },
      imageUrl: ''
    }
  },
  computed: {},
  methods:{
    successMethod(){
      const res = apiGet('users/1');
      res.then(data => {this.imageUrl = data.data.image});
    },
    deleteImage(){
      apiDelete('users/1/delete_image').then(this.imageUrl='');
    }
  }
}
</script>

<style></style>

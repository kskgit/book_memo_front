<template>
<div class="container">
  <Header @get-index = 'getIndex'/>
  <P v-if="isReaded === 'true'">読んだ本</P>
  <P v-else>読んでる本</P>
  <b-row>
    <b-col
      cols="12" sm="6" lg="4"
      v-for="(item, index) in items"
      :key="index"
    >
      <bookBlock
        :item="item"
        @add-read-list="addReadList"
        @delete-list="deleteList"
      ></bookBlock>
    </b-col>
  </b-row>
</div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import bookBlock from '@/components/bookBlock.vue';
import { apiGet, apiPut, apiDelete } from '~/api/config';
export default {
  components: { Header,bookBlock },
  created: function() {
    this.getIndex();
  },
  data: function () {
    return {
      query: '',
      items: [],
      isReaded: false
    }
  },
  computed: {},
  methods:{
    // 一覧取得
    async getIndex(){
      this.isReaded = sessionStorage.getItem('IS_READED');
      const url = 'books';
      const params = {
        is_readed: this.isReaded,
      }
      let array = [];
      await apiGet(url, params).then(res => {
        array = res.data;
      })
      let tmpItems = [];
      // id検索
      array.map(function get(val, index) {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${val.volume_id}`).then(res => {
          tmpItems.push(res.data);
          tmpItems[index]['bookId'] = val.id
        });
      })
      this.items = tmpItems;
    },
    // 読んだリストに追加
    addReadList(bookId, isReaded) {
      const params = {
        is_readed: isReaded
      }
      const url = 'books/' + bookId;
      apiPut(url, params).then(res => {
        sessionStorage.setItem('IS_READED', true);
        this.getIndex();
      })
    },
    // 読んでるリストから削除
    deleteList(bookId) {
    },
  }
}
</script>

<style></style>
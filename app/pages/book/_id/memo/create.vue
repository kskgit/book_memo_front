<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <Header />
    <b-form-group
      id="input-group-1"
      label="日付"
      label-for="input-1"
    >
      <Datepicker
        v-model="form.date"
        :language="ja"
        class="date-picker"
        :format="DatePickerFormat"
      ></Datepicker>
    </b-form-group>

    <b-form-group id="input-group-2" label="メモ:" label-for="input-2">
      <b-form-textarea
        id="input-2"
        v-model="form.memo"
        required
        placeholder="読んだメモ"
      ></b-form-textarea>
    </b-form-group>

    <b-form-group id="input-group-3" label="ページ:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.pageNumber"
        type="number"
        required
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
import { apiPost } from '~/api/config';
import Header from '@/components/Header.vue';
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale'
export default {
  components: { Header,Datepicker },
  data: function () {
    return {
      ja: ja,
      form : {
        date: '',
        memo: '',
        pageNumber: 0,
      },
      DatePickerFormat: 'yyyy-MM-dd'
    }
  },
  methods:{
    onReset() {
      console.log('リセット');
    },
    onSubmit() {
      console.log('送信');
    },
  }
}
</script>

<style>
  .date-picker > div > input {
    width: 100%;
    display: block;
    text-align: center;
    display: block;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
        width: 100%;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>
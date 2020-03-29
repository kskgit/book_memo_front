<template>
  <div>
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
      <!-- @input="$emit('update:form', $event)" -->
      <b-form-textarea
        v-model="form.memo"
        id="input-2"
        placeholder="読んだメモ"
      ></b-form-textarea>
    </b-form-group>

    <b-form-group id="input-group-3" label="ページ:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.page_number"
        type="number"
      ></b-form-input>
    </b-form-group>
    <b-alert variant="success" v-model="isSuccess" show>保存されました</b-alert>
    <b-button @click="onSubmit" type="submit" variant="primary">保存</b-button>
    <b-button @reset="onReset" type="reset" variant="danger">クリア</b-button>
  </div>
</template>

<script>
import { apiPost } from '~/api/config';
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale'
export default {
  components: { Datepicker },
  props: {
    form: {
      type: Object,
      required: true,
      default: {},
    },
    isSuccess: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  created: function() {
    this.form.book_id = this.$route.params.book_id;
  },
  data: function () {
    return {
      ja: ja,
      DatePickerFormat: 'yyyy-MM-dd',
    }
  },
  methods:{
    onReset() {
      console.log('リセット');
    },
    onSubmit() {
      this.$emit('save');
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

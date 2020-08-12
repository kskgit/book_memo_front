import { extend } from "vee-validate"
import { required, email, min, alpha_num } from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "必須項目です",
})
extend("email", {
  ...email,
  message: "メールアドレス形式で入力して下さい",
})
extend("min", {
  ...min,
  message: "8桁以上で入力して下さい",
})
extend("alpha_num", {
  ...alpha_num,
  message: "アルファベットか数値で入力して下さい",
})

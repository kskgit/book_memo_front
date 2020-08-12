import { extend } from "vee-validate"
import { required, email } from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "必須項目です",
})
extend("email", {
  ...email,
  message: "メール形式で入力して下さい",
})

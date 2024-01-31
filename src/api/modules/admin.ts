import axios from '../axios'

// 验证码
export function getCaptchaImgApi() {
  return axios.get(`/index/captcha`)
}

// 登录
export function loginApi(params: {
  captchaKey: string
  username: string
  password: string
  code: string
}) {
  return axios.post(`/auth/login`, params)
}
<template>
  <div class="login_form">
    <el-form :model="formData">
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="密码" />
      </el-form-item>
      <el-form-item prop="validateCode">
        <el-input
          v-model="formData.validateCode"
          placeholder="验证码">
          <template #suffix>
            <img
              class="captchaImg"
              :src="captchaImgSrc"
              @click="getCaptchaImg"/>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button
      class="loginButton"
      type="primary"
      @click="login">登录</el-button>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCaptchaImgApi, loginApi } from '@/api/modules/admin'

onMounted(() => {
  getCaptchaImg()
})

const router = useRouter()

const formData = ref({
  username: import.meta.env.VITE_LOGIN_USERNAME || '',
  password: import.meta.env.VITE_LOGIN_PASSWORD || '',
  validateCode: ''
})

/* ================ 登录验证码 ================ */
const captchaImgSrc = ref('')
const captchaKey = ref('')
const getCaptchaImg = async () => {
  try {
    const res = await getCaptchaImgApi()
    if(res.data) {
      const {
        verifyCodeKey,
        verifyCodeBase64
      } = res.data

      captchaKey.value = verifyCodeKey
      captchaImgSrc.value = verifyCodeBase64

    }

  } catch (err) {
    console.error(err)
  }
  
}


/* ================ 登录 ================ */
const login = async () => {
  try {
    await loginApi({...formData.value})

    router.push({
      name: 'UserTable'
    })

  } catch (err) {
    console.error(err)
  }
}

</script>

<style lang="less" scoped>
.login_form {
  width: 400px;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;

  .loginButton {
    width: 100%;
    margin-top: 12px;
  }
  
  .captchaImg {
    cursor: pointer;
    border-left: 1px solid rgba(0, 0, 0, .1);
    height: calc(100% - 1px);
    min-width: 110px;
  }
}
</style>
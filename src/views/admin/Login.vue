<template>
  <div class="login_page">
    <h1 class="login_title">XXX后台管理系统</h1>
    <LoginForm></LoginForm>
  </div>
</template>


<script setup lang="ts">

import LoginForm from './LoginForm.vue'



</script>

<style lang="less" scoped>

.login_page {
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

</style>

<template>
  <div class="main_page">
    <el-container>
      <el-header height="60px">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
</script>


<style lang="less" scoped>
.main_page {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      --el-header-padding: 0;
    }
    .el-aside {
      background-color: #545c64;
    }
    .el-main {
      background-color: #f2f3f5;
    }
  }
}
</style>
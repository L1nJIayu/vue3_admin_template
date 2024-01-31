<template>
  <div class="page">
    <el-table :data="tableData"></el-table>
  </div>
</template>


<script setup lang="ts">
import { useTable } from '@/hooks'
import { onMounted } from 'vue';

onMounted(() => {
  getTableData()
})

const {
  tableData,
  getTableData
} = useTable()

</script>
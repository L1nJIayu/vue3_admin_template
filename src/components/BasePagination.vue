<template>
  <el-pagination
    v-model:page-size="pagination.pageSize"
    v-model:current-page="pagination.currentPage"
    :total="pagination.total"
    layout="prev,pager,next"></el-pagination>
</template>

<script setup lang="ts">
import { watch } from 'vue'

export type Pagination = {
  pageSize: number
  currentPage: number
  total: number
}

const props = defineProps<{
  pagination: Pagination
}>()

const emits = defineEmits<{
  paginationChange: []
}>()

watch(
  [
    () => props.pagination.currentPage,
    () => props.pagination.pageSize
  ], () => {
    emits('paginationChange')
  }, {
  immediate: false
})

</script>
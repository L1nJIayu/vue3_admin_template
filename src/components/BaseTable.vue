<template>
  <el-table :data="tableData">
      <el-table-column
        v-for="(column, index) in tableColumn"
        :label="column.label"
        :prop="column.prop">
        <template v-if="column.isSlot">
          <slot
            :name="column.prop"
            :row="tableData[index]"
            :value="tableData[index][column.prop]"></slot>
        </template>
      </el-table-column>
  </el-table>

  <el-pagination
    v-model:page-size="pagination.pageSize"
    v-model:current-page="pagination.currentPage"
    :total="pagination.total"
    layout="prev,pager,next"></el-pagination>

</template>

<script setup lang="ts">
import { watch } from 'vue'
export type TableColumnItem = {
  label: string
  prop: string
  isSlot?: boolean
}
type Pagination = {
  currentPage: number
  pageSize: number
  total: number
}


const props = defineProps<{
  tableColumn: TableColumnItem[]
  tableData: Array<any>
  pagination: Pagination
}>()

const emits = defineEmits<{
  paginationChange: [newV: Pagination, oldV: Pagination]
}>()

watch(props.pagination, (newV, oldV) => {
  emits('paginationChange', newV, oldV)
})


</script>
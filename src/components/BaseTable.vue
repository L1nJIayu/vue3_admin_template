<template>
  <el-table :data="tableData">
      <el-table-column
        v-for="column in tableColumn"
        :label="column.label"
        :prop="column.prop"
        class-name="status"
        :formatter="formatter(column)">
        <template v-if="column.isSlot" #default="{ row }">
          <slot
            :name="column.prop"
            :row="row"
            :value="row[column.prop]"></slot>
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
  formatter?: (value: any) => string
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

// 数据格式化
const formatter = (tableColumnItem: TableColumnItem) => {
  return (row: any, column: string, cellValue: any, index: number) => {
    if(tableColumnItem.formatter) {
      return tableColumnItem.formatter(cellValue)
    } else {
      return cellValue
    }
  }
}

</script>

<style lang="less" scoped>

:deep(.status) {
  color: red;
}
</style>
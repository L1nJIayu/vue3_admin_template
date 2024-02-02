<template>
  <el-table :data="tableData">
      <el-table-column
        v-for="column in tableColumn"
        :label="column.label"
        :prop="column.prop">
        <template #default="{ row }">
          <slot
            v-if="column.isSlot"
            :name="column.prop"
            :row="row"
            :value="row[column.prop]"></slot>
          <div v-else :class="getTableColumnClassName(column, row)">
            {{ formatter(column, row) }}
          </div>
        </template>
      </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
export type TableColumnItem = {
  label: string
  prop: string
  isSlot?: boolean
  formatter?: <T>(value: T) => string
  setClassName?: <T>(value: T) => string
}
type Pagination = {
  currentPage: number
  pageSize: number
  total: number
}

defineProps<{
  tableColumn: TableColumnItem[]
  tableData: Array<any>
  pagination: Pagination
}>()

const emits = defineEmits<{
  paginationChange: []
}>()


// 数据格式化
const formatter = (tableColumnItem: TableColumnItem, row: any) => {
  if(tableColumnItem.formatter) {
    return tableColumnItem.formatter(row[tableColumnItem.prop])
  } else {
    if((row[tableColumnItem.prop] ?? '') !== '') {
      return row[tableColumnItem.prop]
    } else {
      return '- -'
    }
  }
}

// 列className
const getTableColumnClassName = (column: TableColumnItem, row: any) => {
  if(column.setClassName) {
    return column.setClassName(row[column.prop])
  } else {
    return ''
  }
}

</script>
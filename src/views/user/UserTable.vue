<template>
  <div class="page">
    <BaseSearch :form-list="searchFormList" @search="getTableDataWidthSearchParams" />
    <BaseTable
      :table-column="tableColumn"
      :table-data="tableData"
      :pagination="pagination"
      @pagination-change="getTableData">
      <template #status="{ value }">{{ value }}</template>
    </BaseTable>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTable } from '@/hooks'

import { getUserTableDataApi } from '@/api/modules/user'
import BaseSearch from '@/components/BaseSearch.vue'
import type {
  SearchFormListItem,
  SelectOption
} from '@/components/BaseSearch.vue'
import BaseTable, { type TableColumnItem } from '@/components/BaseTable.vue'

onMounted(() => {
  getTableData()
})

const ACCOUNT_STATUS_INACTIVE = 0
const ACCOUNT_STATUS_ACTIVE = 1
const userStatusOptions: SelectOption[] = [
  { label: '冻结', value: ACCOUNT_STATUS_INACTIVE },
  { label: '可用', value: ACCOUNT_STATUS_ACTIVE }
]
const searchFormList = ref<SearchFormListItem[]>([
  { type: 'text', label: '用户名', prop: 'username' },
  { type: 'text', label: '昵称', prop: 'nickname' },
  { type: 'select', label: '状态', prop: 'username', options: userStatusOptions },
])
const tableColumn = ref<TableColumnItem[]>([
  { label: 'ID', prop: 'id' },
  { label: '用户名', prop: 'username' },
  { label: '昵称', prop: 'nickname' },
  {
    label: '状态',
    prop: 'status',
    formatter: (value) => {
      const target = userStatusOptions.find((option: SelectOption) => option.value == value)
      if(target) {
        return target.label
      } else {
        return '未知'
      }
    },
    setClassName: (value) => {
      switch(value) {
        case ACCOUNT_STATUS_INACTIVE: return 'color-inactive'
        case ACCOUNT_STATUS_ACTIVE: return 'color-success'
        default: return 'color-inactive'
      }
    }
  },
])

const {
  tableData,
  pagination,
  getTableData,
  getTableDataWidthSearchParams
} = useTable(getUserTableDataApi, {
  isPagination: true
})




</script>
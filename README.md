# vue3_admin_template

vue3工程模板，提供各类工具，用于快速构建后台管理系统

每次开启新项目时，都要把各种各样的依赖的工具安装，拷贝，着实麻烦。
此模板可以直接拿来用，目的就在于快速开发管理后台的页面。

## 依赖

- TypeScript
- normalize.css
- ElementPlus
- Axios
- Less

## 示例

### 表格页面

```vue
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
```

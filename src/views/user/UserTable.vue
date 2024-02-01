<template>
  <div class="page">
    <BaseSearch :form-list="searchFormList" />
    <!-- <div>
      <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
      <el-button @click="search">搜索</el-button>
    </div> -->
    <BaseTable
      :table-column="tableColumn"
      :table-data="tableData"
      :pagination="pagination"
      @pagination-change="paginationChange">
      <template #status="{ value }">{{ value }}</template>
    </BaseTable>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTable } from '@/hooks'

import { getUserTableDataApi } from '@/api/modules/user'
import BaseSearch, { type SearchFormListItem } from '@/components/BaseSeach.vue'
import BaseTable, { type TableColumnItem } from '@/components/BaseTable.vue'

onMounted(() => {
  getTableData()
})

type SearchForm = {
  username: string
}
const searchFormList = ref<SearchFormListItem[]>([
  { type: 'text', label: '用户名', prop: 'username' },
])
const searchForm = ref<SearchForm>({
  username: ''
})
const search = () => {
  getTableDataWidthSearchParams({
    ...searchForm.value
  })
}

const tableColumn = ref<TableColumnItem[]>([
  { label: 'ID', prop: 'id' },
  { label: '用户名', prop: 'username' },
  { label: '昵称', prop: 'nickname' },
  { label: '状态', prop: 'status', isSlot: true }
])

const {
  tableData,
  pagination,
  getTableData,
  getTableDataWidthSearchParams
} = useTable(getUserTableDataApi)


const paginationChange = () => getTableData()



</script>
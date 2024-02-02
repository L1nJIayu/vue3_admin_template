import { ref, toRefs, watch } from 'vue'
import type { Pagination } from '@/components/BasePagination.vue'
export function useTable (api: (params: any) => Promise<any>) {

  // 表格数据
  const tableData = ref([])

  // 表格分页信息
  const pagination = ref<Pagination>({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })

  // 表格搜索参数
  const searchForm = ref({})
  const getTableDataWidthSearchParams = (searchParams = {}) => {
    searchForm.value = {
      ...searchParams
    }
    if(pagination.value.currentPage === 1) {
      getTableData()
    } else {
      pagination.value.currentPage = 1  // 页面变动即会触发getTableData
    }
  }

  const getTableData = async (newPagination?: Pagination) => {
    if(newPagination) {
      pagination.value.currentPage = newPagination.currentPage
      pagination.value.pageSize = newPagination.pageSize
    }
    try {
      const params = {
        ...searchForm.value,
        pageNum: pagination.value.currentPage,
        pageSize: pagination.value.pageSize,
      }
      const { data } = await api(params)
      const { list, total } = data
      tableData.value = list
      pagination.value.total = total

      console.log('getTableData', params, list)

    } catch (err) {
      console.error(err)
    }
  }


  return {
    tableData,
    pagination,
    getTableData,
    getTableDataWidthSearchParams,
  }
}
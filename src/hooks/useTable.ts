import { ref, toRefs, watch } from 'vue'
import type { Pagination } from '@/components/BasePagination.vue'

export interface UseTableOptions {
  isPagination?: boolean
}
export function useTable (api: (params: any) => Promise<any>, options: UseTableOptions = {}) {

  const {
    isPagination = true
  } = options

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
    if(isPagination && pagination.value.currentPage !== 1) {
      pagination.value.currentPage = 1  // 页面变动即会触发getTableData
    } else {
      getTableData()
    }
  }

  const getTableData = async (newPagination?: Pagination) => {
    if(newPagination) {
      pagination.value.currentPage = newPagination.currentPage
      pagination.value.pageSize = newPagination.pageSize
    }
    try {
      let params = {
        ...searchForm.value,
        pageNum: isPagination ? pagination.value.currentPage : undefined,
        pageSize: isPagination ? pagination.value.pageSize : undefined,
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
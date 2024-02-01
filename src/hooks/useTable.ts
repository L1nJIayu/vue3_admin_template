import { ref, toRefs, watch } from 'vue'

export function useTable (api: (params: any) => Promise<any>) {

  // 表格数据
  const tableData = ref([])

  // 表格分页信息
  const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })

  // 表格搜索参数
  const searchForm = ref({})
  const getTableDataWidthSearchParams = (searchParams = {}) => {
    pagination.value.currentPage = 1
    searchForm.value = {
      ...searchParams
    }
    getTableData()
  }

  const getTableData = async () => {
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
import { ref, toRefs } from 'vue'

export function useTable () {
  const tableData = ref([])

  const getTableData = () => {
    tableData.value = [
      { id: 1, username: 'Jeffrey', status: 1 },
      { id: 2, username: 'Toms', status: 1 },
      { id: 3, username: 'Mike', status: 1 },
      { id: 4, username: 'WeiRan', status: 1 },
    ]
  }


  return {
    ...toRefs(tableData),
    getTableData
  }
}
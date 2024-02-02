

const userTableData = [
  { id: 1, username: 'jeffrey1', nickname: 'J1', status: 1 },
  { id: 2, username: 'jeffrey2', nickname: 'J2', status: 0 },
  { id: 3, username: 'jeffrey3', nickname: 'J3', status: 1 },
  { id: 4, username: 'jeffrey4', nickname: 'J4', status: 1 },
  { id: 5, username: 'jeffrey5', nickname: 'J5', status: 1 },
  { id: 6, username: 'jeffrey6', nickname: 'J6', status: 1 },
  { id: 7, username: 'jeffrey7', nickname: 'J7', status: 1 },
  { id: 8, username: 'jeffrey8', nickname: 'J8', status: 1 },
  { id: 9, username: 'jeffrey9', nickname: 'J9', status: 1 },
  { id: 10, username: 'jeffrey10', nickname: 'J10', status: 1 },
  { id: 11, username: 'jeffrey11', nickname: 'J11', status: 1 },
  { id: 12, username: 'jeffrey12', nickname: 'J12', status: 1 },
]

export function getUserTableDataApi (params: {
  pageNum: number
  pageSize: number
}) {
  const { pageNum = 1, pageSize = 10 } = params
  const result = userTableData.slice(
    (pageNum - 1) * pageSize,
    (pageNum * pageSize)
  )
  return Promise.resolve({
    data: {
      list: result,
      total: userTableData.length
    }
  })
}
export const useTableHandler = ({ url, params = {} }) => {
  const rows = ref([])
  const filter = ref(null)
  const tableRef = ref(null)
  const loading = ref(false)
  const pagination = ref({
    page: 1,
    sortBy: 'desc',
    descending: false,
    rowsNumber: 15,
    rowsPerPage: 15
  })

  const onRequest = async (props) => {
    loading.value = true
    const { page, rowsPerPage, sortBy, descending } = props.pagination

    const requestData = {
      offset: page - 1,
      limit: rowsPerPage,
      ...params,
      ...(typeof filter.value === 'object' ? filter.value : { q: filter.value })
    }

    try {
      const response = await useApi()(url, { params: requestData })
      rows.value = response.data
      loading.value = false
      pagination.value.rowsNumber = response.count
    }
    catch (err) {
      console.log('err', err)
    }
    finally {
      loading.value = false
    }

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
  }

  function request () {
    tableRef.value.requestServerInteraction()
  }

  return {
    rows,
    filter,
    request,
    loading,
    tableRef,
    onRequest,
    pagination
  }
}

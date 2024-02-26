export const useApi = () => {
  const nuxtApp = useNuxtApp()

  const handleError = (error) => {
    if ([401, 403, 404, 400, 406, 405].includes(error.response?.status)) {
      useNotify()('error', error.response?._data.detail)
    }

    if (error.response?.status === 401) {
      nuxtApp.$router.push('/login')
    }

    if (error.response?.status === 422) {
      error.response?._data.detail.forEach(element => {
        console.error('Validation Error:', element.msg)
      })
    }

    throw error
  }

  const setAuthHeader = (options) => {
    const cookie = useCookie('token')
    if (cookie) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${cookie.value}`
      }
    }
    return options
  }

  return async (url, options = {}) => {
    options = setAuthHeader(options)

    try {
      const fetchFunction = process.server ? useFetch : nuxtApp.$fetch
      const fullUrl = process.server ? `${nuxtApp.$config.public.baseURL}${url}` : url
      const response = await fetchFunction(fullUrl, options)

      return process.server ? response.data.value : response
    }
    catch (error) {
      handleError(error)
    }
  }
}

export const useApi = () => {
  const nuxtApp = useNuxtApp()

  const fetchServer = async (url, options = {}) => {
    const cookie = useCookie('token')
    if (cookie) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${cookie.value}`
      }
    }

    try {
      const response = await useFetch(`${nuxtApp.$config.public.baseURL}${url}`, options)

      return response.data.value
    }
    catch (error) {
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
  }

  const fetchClient = async (url, options = {}) => {
    const cookie = useCookie('token')
    if (cookie) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${cookie.value}`
      }
    }

    try {
      const response = await nuxtApp.$fetch(url, options)

      return response
    }
    catch (error) {
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
  }

  return { fetchServer, fetchClient }
}

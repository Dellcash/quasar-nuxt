import { LocalStorage } from 'quasar'

export const use$Fetch = () => {
  const nuxtApp = useNuxtApp()

  const getToken = () => {
    return LocalStorage.getItem('token')
  }

  return async (url, options = {}) => {
    const token = getToken()
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
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
}

import { API_URL_AUTH } from '.'

export const authService = {
  login (form) {
    return useApi()(API_URL_AUTH.login, {
      method: 'POST',
      body: new URLSearchParams(form)
    })
  },
  logOut () {
    const cookie = useCookie('token')
    cookie.value = null
    useNuxtApp().$router.push('/login')
  }
}

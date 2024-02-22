import { API_URL_AUTH } from '.'
import { LocalStorage } from 'quasar'

export const authService = {
  login (form) {
    const { fetchClient } = useApi()
    return fetchClient(API_URL_AUTH.login, {
      method: 'POST',
      body: new URLSearchParams(form)
    })
  },
  logOut () {
    LocalStorage.clear()
    useNuxtApp().$router.push('/login')
  }
}

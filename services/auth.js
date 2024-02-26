import { API_URL_AUTH } from '.'
import { LocalStorage } from 'quasar'

export const authService = {
  login (form) {
    return useApi()(API_URL_AUTH.login, {
      method: 'POST',
      body: new URLSearchParams(form)
    })
  },
  logOut () {
    LocalStorage.clear()
    useNuxtApp().$router.push('/login')
  }
}

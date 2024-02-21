import { API_URL_AUTH } from '.'
import { LocalStorage } from 'quasar'

export const authService = {
  login (fetchFunction, form) {
    return useCallApi(fetchFunction, API_URL_AUTH.login, 'POST', new URLSearchParams(form))
  },
  logOut () {
    LocalStorage.clear()
    useNuxtApp().$router.push('/login')
  }
}

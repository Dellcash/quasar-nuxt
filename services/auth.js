import { API_URL_AUTH } from '.'
import { LocalStorage } from 'quasar'

export const authService = {
  async login (form) {
    return await useApi()(API_URL_AUTH.login, {
      method: 'POST',
      body: new URLSearchParams(form)
    })
  },
  logOut () {
    LocalStorage.clear()
    useNuxtApp().$router.push('/login')
  }
}

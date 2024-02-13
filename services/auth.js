import { API_URL_AUTH } from "."

export const authService = {
  async login(form) {
    return await useApi()(API_URL_AUTH.login, {
      method: 'POST',
      body: new URLSearchParams(form)
    })
  },
  logOut() {
    localStorage.clear()
    useNuxtApp().$router.push('/login')
  }
}
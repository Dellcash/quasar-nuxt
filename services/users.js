import { API_URL_USERS } from '.'

export const usersService = {
  async fetchProvinces () {
    return await useApi()(API_URL_USERS.provincesList)
  },
  async generateUser (form) {
    return await useApi()(API_URL_USERS.generateUser, {
      method: 'POST',
      body: form
    })
  }
}

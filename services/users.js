import { API_URL_USERS } from '.'

export const usersService = {
  fetchProvinces () {
    return useApi()(API_URL_USERS.provincesList)
  },
  generateUser (form) {
    return useApi()(API_URL_USERS.generateUser, {
      method: 'POST',
      body: form
    })
  }
}

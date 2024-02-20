import { API_URL_USERS } from '.'

export const usersService = {
  fetchProvinces () {
    return useCallApi(API_URL_USERS.provincesList)
  },
  generateUser (form) {
    return useCallApi(API_URL_USERS.generateUser, 'POST', form)
  }
}

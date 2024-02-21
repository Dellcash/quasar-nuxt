import { API_URL_USERS } from '.'

export const usersService = {
  fetchProvinces (fetchFunction) {
    return useCallApi(fetchFunction, API_URL_USERS.provincesList)
  },
  generateUser (fetchFunction, form) {
    return useCallApi(fetchFunction, API_URL_USERS.generateUser, 'POST', form)
  }
}

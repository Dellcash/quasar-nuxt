import { API_URL_USERS } from '.'

export const usersService = {
  fetchProvinces () {
    const { fetchClient } = useApi()
    return fetchClient(API_URL_USERS.provincesList)
  },
  generateUser (form) {
    const { fetchServer } = useApi()
    return fetchServer(API_URL_USERS.generateUser, {
      method: 'POST',
      body: form
    })
  }
}

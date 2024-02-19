import { API_URL_NOTIF } from '.'

export const notifService = {
  async newAnnounc (form) {
    return await useApi()(API_URL_NOTIF.newAnnounc, {
      method: 'POST',
      body: form
    })
  },
  async deleteAnnounc (id) {
    return await useApi()(API_URL_NOTIF.deleteAnnounc(id), {
      method: 'DELETE'
    })
  }
}

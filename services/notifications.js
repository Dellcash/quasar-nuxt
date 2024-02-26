import { API_URL_NOTIF } from '.'

export const notifService = {
  newAnnounc (form) {
    return useApi()(API_URL_NOTIF.newAnnounc, {
      method: 'POST',
      body: form
    })
  },
  deleteAnnounc (id) {
    return useApi()(API_URL_NOTIF.deleteAnnounc(id), {
      method: 'DELETE'
    })
  },
  setNewConfig (form) {
    return useApi()(API_URL_NOTIF.setNewConfig, {
      method: 'PUT',
      body: form
    })
  },
  getNotifConfig () {
    return useApi()(API_URL_NOTIF.getNotifConfig)
  },
  setStatus (form) {
    return useApi()(API_URL_NOTIF.setStatus, {
      method: 'PATCH',
      body: form
    })
  }
}

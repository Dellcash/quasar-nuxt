import { API_URL_NOTIF } from '.'

export const notifService = {
  newAnnounc (form) {
    return useCallApi(API_URL_NOTIF.newAnnounc, 'POST', form)
  },
  deleteAnnounc (id) {
    return useCallApi(API_URL_NOTIF.deleteAnnounc(id), 'DELETE')
  },
  setNewConfig (form) {
    return useCallApi(API_URL_NOTIF.setNewConfig, 'PUT', form)
  },
  getNotifConfig () {
    return useCallApi(API_URL_NOTIF.getNotifConfig)
  },
  setStatus (form) {
    return useCallApi(API_URL_NOTIF.setStatus, 'PATCH', form)
  }
}

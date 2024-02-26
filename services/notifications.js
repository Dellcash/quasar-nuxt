import { API_URL_NOTIF } from '.'

export const notifService = {
  newAnnounc (form) {
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.newAnnounc, {
      method: 'POST',
      body: form
    })
  },
  deleteAnnounc (id) {
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.deleteAnnounc(id), {
      method: 'DELETE'
    })
  },
  setNewConfig (form) {
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.setNewConfig, {
      method: 'PUT',
      body: form
    })
  },
  getNotifConfig () {
    const { fetchServer } = useApi()
    return fetchServer(API_URL_NOTIF.getNotifConfig)
  },
  setStatus (form) {
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.setStatus, {
      method: 'PATCH',
      body: form
    })
  }
}

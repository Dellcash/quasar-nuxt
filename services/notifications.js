import { API_URL_NOTIF } from '.'

export const notifService = {
  newAnnounc (form) {
    console.log('newAnnounc')
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.newAnnounc, {
      method: 'POST',
      body: form
    })
  },
  deleteAnnounc (id) {
    console.log('deleteAnnounc')
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.deleteAnnounc(id), {
      method: 'DELETE'
    })
  },
  setNewConfig (form) {
    console.log('setNewConfig')
    const { fetchServer } = useApi()
    return fetchServer(API_URL_NOTIF.setNewConfig, {
      method: 'PUT',
      body: form
    })
  },
  getNotifConfig () {
    console.log('getNotifConfig')
    const { fetchServer } = useApi()
    return fetchServer(API_URL_NOTIF.getNotifConfig)
  },
  setStatus (form) {
    console.log('setStatus')
    const { fetchClient } = useApi()
    return fetchClient(API_URL_NOTIF.setStatus, {
      method: 'PATCH',
      body: form
    })
  }
}

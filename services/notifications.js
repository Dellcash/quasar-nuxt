// import { API_URL_NOTIF } from '.'

// export const notifService = {
//   newAnnounc (form) {
//     const { fetchClient } = useApi()
//     return fetchClient(API_URL_NOTIF.newAnnounc, {
//       method: 'POST',
//       body: form
//     })
//   },
//   deleteAnnounc (id) {
//     const { fetchClient } = useApi()
//     return fetchClient(API_URL_NOTIF.deleteAnnounc(id), {
//       method: 'DELETE'
//     })
//   },
//   setNewConfig (form) {
//     const { fetchServer } = useApi()
//     return fetchServer(API_URL_NOTIF.setNewConfig, {
//       method: 'PUT',
//       body: form
//     })
//   },
//   getNotifConfig () {
//     const { fetchClient } = useApi()
//     return fetchClient(API_URL_NOTIF.getNotifConfig)
//   },
//   setStatus (form) {
//     const { fetchClient } = useApi()
//     return fetchClient(API_URL_NOTIF.setStatus, {
//       method: 'PATCH',
//       body: form
//     })
//   }
// }

import { API_URL_NOTIF } from '.'

const makeRequest = (method, url, body = undefined) => {
  const fetchFunction = method === 'GET' ? useApi().fetchClient : useApi().fetchServer
  const options = { method }
  if (body) options.body = body
  return fetchFunction(url, options)
}

export const notifService = {
  newAnnounc (form) {
    return makeRequest('POST', API_URL_NOTIF.newAnnounc, form)
  },
  deleteAnnounc (id) {
    return makeRequest('DELETE', API_URL_NOTIF.deleteAnnounc(id))
  },
  setNewConfig (form) {
    return makeRequest('PUT', API_URL_NOTIF.setNewConfig, form)
  },
  getNotifConfig () {
    return makeRequest('GET', API_URL_NOTIF.getNotifConfig)
  },
  setStatus (form) {
    return makeRequest('PATCH', API_URL_NOTIF.setStatus, form)
  }
}

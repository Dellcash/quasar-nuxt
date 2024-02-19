export const API_URL_AUTH = {
  login: 'auth/backoffice/login'
}

export const API_URL_USERS = {
  usersList: 'backoffice/users',
  provincesList: 'geo/provinces',
  generateUser: 'backoffice/generate_user'
}

export const API_URL_NOTIF = {
  getNotifConfig: 'backoffice/subscription_renewal_warning/config',
  setStatus: 'backoffice/subscription_renewal_warning/config',
  setNewConfig: 'backoffice/subscription_renewal_warning/config',
  newAnnounc: 'backoffice/announcement',
  getAnnounc: 'backoffice/announcement',
  deleteAnnounc: id => `backoffice/announcement/${id}`
}

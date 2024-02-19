import { usersService, authService, notifService } from '~/services'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('services', {
    users: usersService,
    auth: authService,
    notif: notifService
  })
})

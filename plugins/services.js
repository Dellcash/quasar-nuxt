import { usersService, authService } from '~/services'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('services', {
    users: usersService,
    auth: authService
  })
})

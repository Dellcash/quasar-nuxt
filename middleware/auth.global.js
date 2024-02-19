// import { LocalStorage } from 'quasar'

// console.log('hihi', LocalStorage)
export default defineNuxtRouteMiddleware((to) => {
  // const isLoggedIn = !!LocalStorage.getItem('token')
  // const isLoginPage = to.path === '/login'

  // if ((isLoggedIn && isLoginPage) || to.path === '/') {
  //   return navigateTo('/users/management')
  // }
  console.log('hihhii', to)
})

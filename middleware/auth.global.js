export default defineNuxtRouteMiddleware((to) => {
  const isLoggedIn = !useCookie('token')
  const isLoginPage = to.path === '/login'

  if ((isLoggedIn && isLoginPage) || to.path === '/') {
    return navigateTo('/users/management')
  }
})

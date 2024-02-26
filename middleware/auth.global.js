export default defineNuxtRouteMiddleware((to) => {
  const isLoggedIn = useCookie('token').value
  const isOnLoginPage = to.path === '/login'
  const isOnManagementPage = to.path === '/users/management'

  if (isLoggedIn && !isOnManagementPage) {
    return navigateTo('/users/management')
  }
  else if (!isLoggedIn && !isOnLoginPage) {
    return navigateTo('/login')
  }
})

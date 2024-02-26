export default defineNuxtRouteMiddleware((to) => {
  const isLoggedIn = !useCookie('token')
  const isLoginPage = to.path === '/login'
  console.log('isLoggedIn', isLoggedIn)
  console.log('isLoginPage', isLoginPage)
  console.log('to.path', to.path)

  if ((isLoggedIn && isLoginPage) || to.path === '/') {
    return navigateTo('/users/management')
  }
  else {
    return navigateTo('/login')
  }
})

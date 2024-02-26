export default defineNuxtRouteMiddleware((to) => {
  const isLoggedIn = useCookie('token').value

  // Check if on the target pages already
  if (to.path === '/login' && isLoggedIn) {
    return navigateTo('/users/management')
  }
  else if (to.path !== '/login' && !isLoggedIn) {
    return navigateTo('/login')
  }
})

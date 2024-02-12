export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = !!localStorage.getItem('token');

  const isLoginPage = to.path === '/login';

  if (!isLoggedIn && !isLoginPage) {
    return navigateTo('/login');
  }

  if (isLoggedIn && isLoginPage) {
    return navigateTo('/');
  }
});



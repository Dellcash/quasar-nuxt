export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config

  nuxtApp.$fetch = (url, options = {}) => {
    const fullUrl = `${config.public.baseURL}${url}`
    return $fetch(fullUrl, options)
  }
})

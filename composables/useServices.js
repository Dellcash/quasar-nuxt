export const useServices = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$services
}

export const useCallApi = (url, method, body = null) => {
  const config = { method }
  if (body) config.body = body
  return useApi()(url, config)
}

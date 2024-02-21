// export const useCallApi = (url, method, body = null) => {
//   const config = { method }
//   if (body) config.body = body
//   return useApi()(url, config)
// }
export const useCallApi = (fetchFunction, url, method, body = null) => {
  const config = { method }
  if (body) config.body = body
  return fetchFunction(url, config)
}

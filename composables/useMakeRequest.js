export const useMakeRequest = (method, url, body = undefined) => {
  const fetchFunction = method === 'GET' ? useApi().fetchClient : useApi().fetchServer
  const options = { method }
  if (body) options.body = body
  return fetchFunction(url, options)
}

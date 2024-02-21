import 'url-search-params-polyfill'

export const getParams = location => {
  const searchParams = new URLSearchParams(location.search)
  return {
    query: searchParams.get('id') || ''
  }
}

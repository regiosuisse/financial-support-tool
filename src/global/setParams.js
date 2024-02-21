import 'url-search-params-polyfill'

export const setParams = ({id = '', name = ''}) => {
  const searchParams = new URLSearchParams()
  searchParams.set('id', id)
  searchParams.set('name', name.replace(/[ &\\#,+()$~%.'":*?<>{}]/g, '-'))

  return searchParams.toString()
}

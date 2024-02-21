const pathname = window.location.pathname.split('/')[1]
let language = 'de'

switch (pathname) {
  case 'de':
    language = 'de'
    break
  case 'fr':
    language = 'fr'
    break
  case 'it':
    language = 'it'
    break
  default:
    language = 'de'
}

export default language

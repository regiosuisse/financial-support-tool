export default function translate (field, object, locale) {

  let result = object[field];

  if(!locale) {
    locale = 'de';
  }

  if(!object.translations) {
    return result;
  }

  if(locale === 'de') {
    if(result) {
      return result;
    }
    if(object.translations['fr'] && object.translations['fr'][field]) {
      return object.translations['fr'][field];
    }
    if(object.translations['fr'] && typeof object.translations['fr'] === 'string') {
      return object.translations['fr'];
    }
    if(object.translations['it'] && object.translations['it'][field]) {
      return object.translations['it'][field];
    }
    if(object.translations['it'] && typeof object.translations['it'] === 'string') {
      return object.translations['it'];
    }
    return result;
  }

  if(locale === 'fr') {
    if(object.translations['fr'] && object.translations['fr'][field]) {
      return object.translations['fr'][field];
    }
    if(object.translations['fr'] && typeof object.translations['fr'] === 'string') {
      return object.translations['fr'];
    }
    if(result) {
      return result;
    }
    if(object.translations['it'] && object.translations['it'][field]) {
      return object.translations['it'][field];
    }
    if(object.translations['it'] && typeof object.translations['it'] === 'string') {
      return object.translations['it'];
    }
    return result;
  }

  if(locale === 'it') {
    if(object.translations['it'] && object.translations['it'][field]) {
      return object.translations['it'][field];
    }
    if(object.translations['it'] && typeof object.translations['it'] === 'string') {
      return object.translations['it'];
    }
    if(object.translations['fr'] && object.translations['fr'][field]) {
      return object.translations['fr'][field];
    }
    if(object.translations['fr'] && typeof object.translations['fr'] === 'string') {
      return object.translations['fr'];
    }
    return result;
  }

  return result;

}
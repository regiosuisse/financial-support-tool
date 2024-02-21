import React from 'react'

export default function transformFsis(data, filter) {
  return data.map(fsi => transformFsi(fsi, filter))
}

const stripTags = text => {
  return text.replace(/<\/?[^>]+>/gi, '')
}

const naiveHtmlTransform = text => {
  return <div dangerouslySetInnerHTML={{__html: `${text}`}} />
}

const filterTransform = (fsi, filter) => {
  const filterClasses = []
  Object.keys(filter).forEach(filterName => {
    if (fsi[filterName]) {
      fsi[filterName].forEach(v => {
        filterClasses.push(`${filterName}_${v.id}`)
      })
    }
  })

  return filterClasses
}

const transformFsi = (fsi, filter) => {
  return {
    ...fsi,
    description: stripTags(fsi.description),
    additionalInformation: naiveHtmlTransform(fsi.additionalInformation),
    application: naiveHtmlTransform(fsi.application),
    exclusionCriteria: naiveHtmlTransform(fsi.exclusionCriteria),
    inclusionCriteria: naiveHtmlTransform(fsi.inclusionCriteria),
    financingRatio: naiveHtmlTransform(fsi.financingRatio),
    filters: filterTransform(fsi, filter)
  }
}

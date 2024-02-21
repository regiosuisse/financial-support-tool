import {
  filterColor01,
  filterColor02,
  filterColor03,
  filterColor04,
  filterColor05,
  filterColor06
} from '../presentational/Colors'

// data for filter groups that are not provided by the api
const additionalGroupData = [
  {
    name: 'projectTypes',
    icon: 'project_types.svg',
    color: filterColor01,
    sort: 1
  },
  {
    name: 'beneficiaries',
    icon: 'beneficiaries.svg',
    color: filterColor02,
    sort: 2
  },
  {
    name: 'topics',
    icon: 'topics.svg',
    color: filterColor03,
    sort: 3
  },
  {
    name: 'supportTypes',
    icon: 'support_types.svg',
    color: filterColor04,
    sort: 4
  },
  {
    name: 'regions',
    icon: 'regions.svg',
    color: filterColor05,
    sort: 5
  },
  {
    name: 'provinces',
    icon: 'provinces.svg',
    color: filterColor06,
    sort: 6
  }
]

// transform the list of filter values into a nested object that also contains
// information about the filter group
export function transformFilter(data) {
  // on clients request authorities are hidden for now
  delete data.authorities

  const filterGroups = []
  Object.keys(data).forEach(groupName => {
    filterGroups.push({
      ...additionalGroupData.find(a => a.name === groupName),
      ...{
        name: groupName,
        values: data[groupName].map(function(value) {
          return {...value, isChecked: false}
        })
      }
    })
  })

  // sort filter
  filterGroups.sort((a, b) => (a.sort > b.sort ? 1 : -1))

  return filterGroups
}

export function toggleFilterValue(filters, groupName, valueId) {
  const gI = filters.findIndex(g => g.name === groupName)
  const vI = filters[gI].values.findIndex(v => v.id === valueId)

  if (gI === -1 || vI === -1) {
    return filters
  }
  if (filters[gI].values[vI].isChecked === true) {
    filters[gI].values[vI].isChecked = false
  } else {
    filters[gI].values[vI].isChecked = true
  }
  return filters
}

export function filterFsisByCheckedFilters(fsis, filters) {
  const activeCards = fsis.map(f => {
    return f.id
  })
  filters.forEach(filterGroup => {
    const checkedFilterValues = filterGroup.values.filter(v => v.isChecked === true).map(v => {
      return v.id
    })
    // only filter if at least one filter value is checked
    if (checkedFilterValues.length > 0) {
      fsis.forEach(f => {
        const fsiValues = f[filterGroup.name].map(fv => {
          return fv.id
        })
        // check if at least one filter value is matching (OR)
        const matching = fsiValues.some(r => checkedFilterValues.includes(r))
        if (!matching) {
          // remove from active cards
          const index = activeCards.indexOf(f.id)
          if (index > -1) {
            activeCards.splice(index, 1)
          }
        }
      })
    }
  })
  return activeCards
}

export function fsiFilterIcons(fsi, filters) {
  const icons = []
  if (filters) {
    filters.forEach(filter => {
      if (fsi[filter.name]) {
        fsi[filter.name].forEach(fsiFilterValue => {
          const filterValueIcon = filter.values.find(fv => fv.id === fsiFilterValue.id).icon
          if (filterValueIcon) {
            icons.push(filterValueIcon)
          }
        })
      }
    })
  }
  return icons
}

export function getParamsFromFilter(filters) {
  let urlParams = []
  filters.forEach(f => {
    const values = f.values
      .filter(v => v.isChecked)
      .map(v => v.id)
      .join('-')

    if (values) {
      urlParams += `&${f.name}=${values}`
    }
  })
  if (urlParams) {
    urlParams = urlParams.slice(1)
  }
  return urlParams
}
export function setActiveFiltersFromUrl(filters, location) {
  const searchParams = new URLSearchParams(location.search)
  filters.forEach(f => {
    let values = searchParams.get(f.name)
    if (values) {
      values = values.split('-')
      values.forEach(valueId => {
        filters = toggleFilterValue(filters, f.name, parseInt(valueId))
      })
    }
  })

  return filters
}

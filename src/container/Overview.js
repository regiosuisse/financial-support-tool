import React, {Component} from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router'
import Isotope from 'isotope-layout'
import {enableBodyScroll, disableBodyScroll} from 'body-scroll-lock'

import {
  toggleFilterValue,
  filterFsisByCheckedFilters,
  getParamsFromFilter
} from '../data/transformFilter'

import FsiCard from '../presentational/FsiCard'
import {setParams} from '../global/setParams'
import Filters from '../presentational/Filters'
import FsiDetail from '../presentational/FsiDetail'
import {SVGIcon} from '../presentational/Icon'

import {tertiaryDark} from '../presentational/Colors'

import strings from '../strings'

class Overview extends Component {
  state = {
    isotope: null,
    filter: [],
    selectedFsi: null,
    filteredCardsCount: 0,
    resultCount: 999,
    filterUrlParams: ''
  }

  componentDidMount() {
    const grid = document.querySelector('.grid')
    const isotope = new Isotope(grid, {
      itemSelector: '.card',
      masonry: {
        columnWidth: 282,
        gutter: 30,
        isFitWidth: true
      }
    })

    const activeCards = filterFsisByCheckedFilters(this.props.fsis, this.props.filters)
    isotope.arrange({
      filter: activeCards
        .map(f => {
          return `#card${f}`
        })
        .join(',')
    })

    this.setState({isotope, filters: this.props.filters, resultCount: this.props.fsis.length})

    // open detail view, the id is passed from the to url to the props
    const fsi = this.props.fsis.filter(fsi => fsi.id.toString() === this.props.fsiId)
    const selectedFsi = fsi.length > 0 ? fsi[0] : null
    if (selectedFsi) {
      this.showFsiDetail(selectedFsi)
    }

    //
    // filterFromGetParams( this.props.filters,)
  }

  toggleFilterValue(groupName, valueId) {
    let filters = this.state.filters
    const fsis = this.props.fsis

    filters = toggleFilterValue(filters, groupName, valueId)

    const activeCards = filterFsisByCheckedFilters(fsis, filters)
    const filterUrlParams = getParamsFromFilter(filters)

    this.setState({
      filters,
      resultCount: activeCards.length,
      filteredCardsCount: this.props.fsis.length - activeCards.length,
      filterUrlParams
    })

    this.state.isotope.arrange({
      filter: activeCards
        .map(f => {
          return `#card${f}`
        })
        .join(',')
    })

    this.props.history.push(`?${filterUrlParams}`)
  }

  resetFilter() {
    let filters = this.props.filters
    filters.forEach(f => {
      f.values.forEach(v => {
        if (v.isChecked) {
          this.toggleFilterValue(f.name, v.id)
        }
      })
    })
  }

  showFsiDetail(fsi) {
    if (window.ga) {
      window.ga('set', 'page', window.location.pathname + window.location.search + fsi.id)
      window.ga('set', 'title', fsi.title + ' - ' + document.title)
      window.ga('send', 'pageview')
    }

    disableBodyScroll()

    const url = setParams({id: fsi.id, name: fsi.title})
    this.props.history.push(`?${url}`)
    return this.setState({selectedFsi: fsi, showFsiDetail: true})
  }

  closeFsiDetail() {
    enableBodyScroll()
    this.props.history.push(`?${this.state.filterUrlParams}`)

    // keep the id (selectedFsi) in order to fade out the overlay
    return this.setState({showFsiDetail: false})
  }

  render() {
    const {fsis} = this.props
    const {filters} = this.state

    return (
      <>
        {this.state.selectedFsi && (
          <FsiDetail
            fsi={this.state.selectedFsi}
            show={this.state.showFsiDetail}
            close={() => this.closeFsiDetail()}
          />
        )}
        <Content overlayOpen={this.state.showFsiDetail}>
          <FilterWrap>
            <FilterContent>
              {filters && (
                <Filters
                  filters={filters}
                  toggleFilterValue={(groupName, valueId) => {
                    this.toggleFilterValue(groupName, valueId)
                  }}
                />
              )}
            </FilterContent>
          </FilterWrap>
          <FilterContent>
            <ResetFilter visibility={this.state.filteredCardsCount === 0 ? 'hidden' : 'visible'}>
              <span
                onClick={() => {
                  this.resetFilter()
                }}
              >
                <SVGIcon path="layout/reset.svg" />
                {strings.reset_all_filters}
              </span>
            </ResetFilter>
          </FilterContent>
          <GridWrap>
            <NoSearchResults visibility={this.state.resultCount === 0 ? 'visible' : 'hidden'}>
              {strings.noFsiFound}
            </NoSearchResults>
            <Grid className="grid" visibility={this.state.resultCount === 0 ? 'hidden' : 'visible'}>
              {fsis.map(card => (
                <div key={card.id} id={`card${card.id}`} className="card">
                  <FsiCard
                    content={card}
                    overlayOpen={this.state.showFsiDetail}
                    filters={filters}
                    onClick={() => this.showFsiDetail(card)}
                  />
                </div>
              ))}
            </Grid>
          </GridWrap>
        </Content>
      </>
    )
  }
}

const Content = styled.div`
    &:before {
      content: "";
      position: absolute;
      z-index: 1000;
      top: -2000px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      transition: backdrop-filter 0.35s, opacity 0.35s;
      ${props =>
        props.overlayOpen
          ? 'display: block; backdrop-filter: blur(8px);'
          : 'display: none;backdrop-filter: blur(0px);'}
      @media all and (-ms-high-contrast: none) {
        background-color: #fff;
        ${props => (props.overlayOpen ? 'opacity: 0.75;' : 'opacity: 0;')}
      }
      @-moz-document url-prefix() {
        background-color: #fff;
        ${props => (props.overlayOpen ? 'opacity: 0.75;' : 'opacity: 0;')}
      }
    }
  }
`

const GridWrap = styled.div`
  margin: 0 auto;
  max-width: 1251px;
  padding: 50px 15px;
  box-sizing: border-box;
  position: relative;
`

const Grid = styled.div`
  margin: 0 auto;
  visibility: ${props => (props.visibility ? props.visibility : 'hidden')};
`

const NoSearchResults = styled.p`
  visibility: ${props => (props.visibility ? props.visibility : 'hidden')};
  text-align: center;
`

const FilterWrap = styled.div`
  background-color: ${tertiaryDark};
  padding: 40px 0 20px;
`

const FilterContent = styled.div`
  margin: 0 auto;
  width: 1250px;
  max-width: 100%;
`

const ResetFilter = styled.div`
  text-align: right;
  margin: 30px 20px 0 0;
  cursor: pointer;
  span {
    font-weight: bold;
    font-size: 14px;
    display: inline-flex;
    div {
      margin-right: 20px;
    }
  }
  visibility: ${props => (props.visibility ? props.visibility : 'hidden')};
`

export default withRouter(Overview)

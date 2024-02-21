import React, {Component} from 'react'
import styled from 'styled-components'

import FilterGroup from './FilterGroup'
import {primary} from './Colors'
import {InlineSVGIcon} from './Icon'

export default class Filters extends Component {
  state = {
    openFilter: ''
  }

  toggleFilter(filter) {
    if (this.state.openFilter === filter) {
      this.setState({openFilter: ''})
    } else {
      this.setState({openFilter: filter})
    }
  }

  render() {
    const {filters, toggleFilterValue} = this.props
    return (
      <>
        <Wrapper>
          {filters.map((group, i) => (
            <React.Fragment key={i}>
              <FilterGroup
                group={group}
                openFilter={this.state.openFilter}
                toggleFilter={filter => {
                  this.toggleFilter(filter)
                }}
                toggleFilterValue={(name, id) => {
                  toggleFilterValue(name, id)
                }}
              />
            </React.Fragment>
          ))}
        </Wrapper>

        <BarSelectedFilter>
          {filters.map((group, i) => (
            <React.Fragment key={i}>
              {group.values.filter(v => v.isChecked === true).map(value => (
                <SelectedFilterValue
                  key={value.label}
                  color={group.color}
                  onClick={() => {
                    toggleFilterValue(group.name, value.id)
                  }}
                >
                  <FilterValueLabel>
                    {value.icon && (
                      <FilterValueIconWrap>
                        <InlineSVGIcon svg={value.icon} fillColor={primary} />
                      </FilterValueIconWrap>
                    )}
                    {value.label}
                  </FilterValueLabel>
                </SelectedFilterValue>
              ))}
            </React.Fragment>
          ))}
        </BarSelectedFilter>
      </>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1174px) {
    justify-content: center;
  }
`

const FilterValueIconWrap = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  float: left;
`

const FilterValueLabel = styled.div`
  display: flex;
`

const BarSelectedFilter = styled.div`
  display: flex;
  align-items: flex-end;
  padding-top: 21px;
  flex-wrap: wrap;
  padding-right: 15px;
  @media (max-width: 1176px) {
    display: none;
  }
`

const SelectedFilterValue = styled.div`
  border-radius: 17px;
  margin: 0 0 10px 15px;
  padding: 6px 10px 5px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s background-color, 0.2s color;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.color || primary};
  color: ${primary};
  display: inline-flex;
  justify-content: space-between;
  div {
    white-space: nowrap;
  }
`

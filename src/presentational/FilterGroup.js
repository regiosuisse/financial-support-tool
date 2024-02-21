import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import strings from '../strings'
import {primary, tertiary, tertiaryDarker} from './Colors'
import {InlineSVGIcon, SVGIcon} from './Icon'

export default class FilterGroup extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  // close filter if clicking outside of it
  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this)
    const {group, toggleFilter, openFilter} = this.props
    if (!domNode || !domNode.contains(event.target)) {
      if (group) {
        if (group.name === openFilter) {
          toggleFilter(group.name)
        }
      }
    }
  }

  render() {
    const {group, toggleFilter, toggleFilterValue, openFilter} = this.props
    return (
      <>
        {group && (
          <Group key={group.name}>
            <FilterGroupTitle
              onClick={() => {
                toggleFilter(group.name)
              }}
            >
              <FilterGroupIcon>
                {group.icon && (
                  <SVGIcon path={`icon-filter-group/${group.icon}`} fillColor={primary} />
                )}
              </FilterGroupIcon>
              <FilterGroupLabel>
                {typeof strings[`${group.name}_label`] === 'string'
                  ? strings[`${group.name}_label`]
                  : group.name}
              </FilterGroupLabel>
              <FilterGroupCount
                color={group.color}
                visibility={
                  group.values.filter(v => v.isChecked === true).length > 0 ? 'visible' : 'hidden'
                }
              >
                {group.values.filter(v => v.isChecked === true).length}
              </FilterGroupCount>
              <FilterGroupArrow active={group.name === openFilter} />
            </FilterGroupTitle>
            <FilterValues active={group.name === openFilter}>
              {group.values.map(value => (
                <FilterValue
                  key={value.label}
                  active={value.isChecked}
                  color={group.color}
                  onClick={() => {
                    toggleFilterValue(group.name, value.id)
                  }}
                >
                  <FilterValueLabel>
                    {value.icon && (
                      <FilterValueIconWrap>
                        <InlineSVGIcon
                          svg={value.icon}
                          fillColor={value.isChecked ? tertiary : primary}
                        />
                      </FilterValueIconWrap>
                    )}
                    {value.label}
                  </FilterValueLabel>
                  <CloseIcon>
                    <SVGIcon path={'layout/close.svg'} fillColor={tertiary} />
                  </CloseIcon>
                </FilterValue>
              ))}
            </FilterValues>
          </Group>
        )}
      </>
    )
  }
}

const Group = styled.div`
  width: 33.3%;
  min-width: 392px;
  padding: 6px 15px;
  box-sizing: border-box;
  display: block;
  position: relative;

  @media (max-width: 500px) {
    width: 100%;
    min-width: 100%;
  }
`

const FilterGroupTitle = styled.div`
  padding: 12px 15px 10px;
  background-color: ${tertiary};
  border: 1px solid ${tertiaryDarker};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const FilterGroupIcon = styled.div`
  flex: 0 0 25px;
  width: 16px;
  height: 16px;
`

const FilterGroupLabel = styled.div`
  flex: 1 1 auto;
`

const FilterGroupArrow = styled.div`
  flex: 0 0 21px;
  padding-left: 14px;
  left: 0;
  width: 7px;
  height: 8px;
  position: relative;
  box-sizing: initial !important;
  &:before,
  &:after {
    content: '';
    background-color: ${tertiaryDarker};
    width: 2px;
    height: 8px;
    position: absolute;
    transition: transform 0.2s;
  }
  &:before {
    margin-left: 14px;
    transform: rotate(${props => (props.active ? '-135deg' : '-45deg')});
  }
  &:after {
    transform: rotate(${props => (props.active ? '135deg' : '45deg')});
    right: 0px;
  }
`

const FilterGroupCount = styled.div`
  flex: 0 0 22px;
  font-size: 9px;
  background-color: ${props => props.color || primary};
  color: ${tertiary};
  width: 22px;
  height: 22px;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${props => (props.visibility ? props.visibility : 'hidden')};
`

const FilterValues = styled.div`
  position: absolute;
  display: ${props => (props.active ? 'block' : 'none')};
  width: calc(100% - 30px);
  z-index: 2;
  box-sizing: border-box;
  padding: 12px 15px;
  margin-top: 12px;
  background-color: ${tertiary};
  border: 1px solid ${tertiaryDarker};
  border-radius: 6px;
  > div:last-child {
    margin-bottom: 0px !important;
  }
`

const FilterValue = styled.div`
  border-radius: 17px;
  margin-bottom: 10px;
  padding: 6px 10px 5px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s background-color, 0.2s color;
  background-color: ${props => (props.active ? props.color || primary : 'transparent')};
  color: ${props => (props.active ? tertiary : primary)};
  display: flex;
  justify-content: space-between;
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

const CloseIcon = styled.div`
  margin-left: 8px;
`

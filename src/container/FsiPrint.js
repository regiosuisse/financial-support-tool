import React, {Component} from 'react'
import styled from 'styled-components'
import {SVGIcon} from '../presentational/Icon'
import {secondary, tertiary} from '../presentational/Colors'
import strings from '../strings'

export default class FsiPrint extends Component {
  render() {
    return (
      <>
        {this.props.pdf && (
          <PrintBtn href={this.props.pdf} target="_blank">
            <SVGIcon fillColor={tertiary} path="layout/print.svg" />
            <span>{strings.print}</span>
          </PrintBtn>
        )}
      </>
    )
  }
}

const PrintBtn = styled.a`
  width: 170px;
  height: 48px;

  background: ${secondary};
  border-radius: 70px;
  padding: 2px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: relative;
    top: -1px;
  }
  span {
    margin-left: 10px;
    color: ${tertiary};
  }
`

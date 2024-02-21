import React, {Component} from 'react'
import styled from 'styled-components'

import {secondary, tertiary} from './Colors'

export default class Button extends Component {
  render() {
    return (
      <Wrapper distance={this.props.distance} size={this.props.size} onClick={() => this.onClick()}>
        {this.props.children}
      </Wrapper>
    )
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }
}

const Wrapper = styled.div`
  color: ${tertiary};
  background: ${secondary};
  border-radius: 70px;
  text-align: center;
  padding: 15px 0;
  display: block;
`

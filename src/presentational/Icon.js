import React, {Component} from 'react'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'

export class InlineSVGIcon extends Component {
  render() {
    return (
      <Wrapper
        size={this.props.size}
        strokeColor={this.props.strokeColor}
        fillColor={this.props.fillColor}
        dangerouslySetInnerHTML={{
          __html: this.props.svg
        }}
      />
    )
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }
}

export class SVGIcon extends Component {
  render() {
    const icon = require(`../static/${this.props.path}`)
    return (
      <Wrapper
        size={this.props.size}
        strokeColor={this.props.strokeColor}
        fillColor={this.props.fillColor}
      >
        <SVG src={icon} />
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
  width: ${props => (props.size ? `${props.size}px` : '16px')};
  height: ${props => (props.size ? `${props.size}px` : '16px')};
  display: block;
  svg {
    width: 16px;
    height: 16px;
  }
  svg * {
    transition: 0.2s fill;
    fill: ${props => (props.fillColor ? props.fillColor : 'inherit')};
    stroke: ${props => (props.strokeColor ? props.strokeColor : 'inherit')};
  }
`

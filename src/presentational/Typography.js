import React, {Component} from 'react'
import styled from 'styled-components'

import {secondary} from './Colors'

export class H1 extends Component {
  render() {
    return <TitleH1>{this.props.children}</TitleH1>
  }
}
export class H3 extends Component {
  render() {
    return <TitleH3>{this.props.children}</TitleH3>
  }
}
export class P extends Component {
  render() {
    return <Paragraph>{this.props.children}</Paragraph>
  }
}

const TitleH1 = styled.h1`
  font-family: 'Helvetica Neue LT W02_67 Md Cn', 'HelveticaNeueLTStd-MdCn', Helvetica, Arial,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 45px;
  line-height: 100%;
  letter-spacing: 0.015em;
  color: ${secondary};
`

const TitleH3 = styled.h3`
  font-family: 'Helvetica Neue LT W02_67 Md Cn', 'HelveticaNeueLTStd-MdCn', Helvetica, Arial,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 110%;

  letter-spacing: 0.02em;
  margin-top: 0px;
`

const Paragraph = styled.p`
  font-family: 'Helvetica Neue LT W02 55 Roman', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.015em;
`

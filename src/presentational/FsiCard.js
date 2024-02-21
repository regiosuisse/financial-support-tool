import React, {Component} from 'react'
import styled from 'styled-components'
import {truncate} from 'lodash'

import Button from './Button'
import {H3, P} from './Typography'
import {primaryLight, primary} from './Colors'
import {InlineSVGIcon} from './Icon'

import {fsiFilterIcons} from '../data/transformFilter'
import strings from '../strings'

export default class FsiCard extends Component {
  render() {
    const {content, filters, onClick, overlayOpen} = this.props
    return (
      <CardWrapper>
        <Card
          overlayOpen={overlayOpen}
          onClick={() => {
            onClick()
          }}
        >
          <CardContent>
            <CardText>
              <Title>
                <H3>{content.title}</H3>
              </Title>
              <Text>
                <P>
                  {truncate(content.description, {
                    length: 173,
                    separator: /,? +/
                  })}
                </P>
              </Text>
            </CardText>
            <CardIcons>{this.renderFilterIcons(content, filters)}</CardIcons>
          </CardContent>
          <CardFooter>
            <Button>{strings.read_more}</Button>
          </CardFooter>
        </Card>
      </CardWrapper>
    )
  }
  renderFilterIcons(fsi, filters) {
    const icons = fsiFilterIcons(fsi, filters)
    return icons.map((icon, index) => {
      return <InlineSVGIcon key={index} svg={icon} fillColor={primary} />
    })
  }
}

const CardWrapper = styled.div`
  width: 280px;
  height: 405px;
  padding-bottom: 30px;
  box-sizing: border-box;
`

const Card = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  box-shadow: 0px 11px 44px rgba(0, 0, 0, 0.13);
  padding: 30px 20px 30px 30px;
  box-sizing: border-box;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    ${props =>
      !props.overlayOpen &&
      'transform: scale(1.05);box-shadow: 0px 11px 44px rgba(0, 0, 0, 0.18);'} z-index: 1100;
  }
`

const CardFooter = styled.div``

const CardContent = styled.div`
  display: flex;
`

const CardText = styled.div`
  flex: 1 1 100%;
`

const CardIcons = styled.div`
  flex: 1 1 32px;
  padding-left: 16px;
  box-sizing: border-box;
  > div {
    margin-bottom: 10px;
  }
`

const Title = styled.div`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;

  max-width: 200px;
  margin-bottom: 15px;
`

const Text = styled.div`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;

  max-width: 200px;
  color: ${primaryLight};
`

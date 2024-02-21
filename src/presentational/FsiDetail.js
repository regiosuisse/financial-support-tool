import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled, {keyframes} from 'styled-components'

import FsiContacts from '../container/FsiContacts'
import FsiPrint from '../container/FsiPrint'
import strings from '../strings'
import {H1, H3, P} from './Typography'
import {SVGIcon} from './Icon'
import {primary, secondary} from './Colors'

import listIcon from '../static/layout/list-icon.svg'

const newlineList = list => list.map((item, index) => <div key={index}>{item.label}</div>)

export default class FsiDetail extends Component {
  componentDidUpdate() {
    if (this.props.show) {
      ReactDOM.findDOMNode(this).scrollTop = 0
    }
  }
  renderInfos(infos) {
    return infos.map(([title, content, f], index) => (
      <React.Fragment key={index}>
        <InformationTitle>
          <H3>{title}</H3>
        </InformationTitle>
        <InformationContent>{f ? f(content) : content}</InformationContent>
      </React.Fragment>
    ))
  }
  renderLeft() {
    const {
      additionalInformation,
      inclusionCriteria,
      application,
      exclusionCriteria,
      financingRatio,
      contacts
    } = this.props.fsi
    return this.renderInfos([
      [strings.additionalInformation, additionalInformation],
      [strings.inclusionCriteria, inclusionCriteria],

      [strings.exclusionCriteria, exclusionCriteria],
      [strings.financingRatio, financingRatio || 'n/a'],
      [strings.application, application],
      [strings.contacts, <FsiContacts contacts={contacts} />]
    ])
  }

  renderRight() {
    const {
      authorities,
      topics,
      regions,
      projectTypes,
      supportTypes,
      beneficiaries
    } = this.props.fsi
    return this.renderInfos([
      [strings.authorities, authorities, newlineList],
      [strings.beneficiaries_label, beneficiaries, newlineList],
      [strings.topics_label, topics, newlineList],
      [strings.projectTypes_label, projectTypes, newlineList],
      [strings.supportTypes_label, supportTypes, newlineList],
      [strings.regions_label, regions, newlineList]
    ])
  }

  render() {
    return (
      <Overlay show={this.props.show}>
        <FocusLayer onClick={() => this.props.close()} show={this.props.show} />
        <Container show={this.props.show}>
          <CloseContainer>
            <CloseLink onClick={() => this.props.close()}>
              <SVGIcon path={'layout/close-big.svg'} fillColor={primary} />
            </CloseLink>
          </CloseContainer>
          <H1>{this.props.fsi.title}</H1>
          <SplitView.Container>
            <SplitView.Left>
              <InformationContent>{this.props.fsi.description}</InformationContent>
            </SplitView.Left>
            <SplitView.Right>
              <FsiLogo src={this.props.fsi.logo} />
            </SplitView.Right>
            <SplitView.Left>{this.renderLeft()}</SplitView.Left>
            <SplitView.Right>
              {this.props.fsi.moreInformation.length > 0 && (
                <>
                  <InformationTitle>
                    <H3>{strings.moreInformation}</H3>
                  </InformationTitle>
                  <InformationContent>
                    <P>
                      {this.props.fsi.moreInformation.map(({title, url}, index) => {
                        return (
                          <React.Fragment key={index}>
                            {index > 0 && <br />}
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              {title}
                            </a>
                          </React.Fragment>
                        )
                      })}
                    </P>
                  </InformationContent>
                </>
              )}
              {this.renderRight()}
              <FsiPrint pdf={this.props.fsi.pdf} />
            </SplitView.Right>
          </SplitView.Container>
        </Container>
      </Overlay>
    )
  }
}

const slideIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const slideOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const CloseContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 35px;
`

const Overlay = styled.div`
  position: fixed;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  display: ${props => (props.show ? `block` : `none`)};
`

const FocusLayer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 890;
  overflow: hidden;
  animation: ${props =>
    props.show
      ? `${slideIn} 0.35s ease-in-out forwards`
      : `${slideOut} 0.35s ease-in-out forwards`};
`

const FsiLogo = styled.div`
  background-image: ${props => `url("${props.src}")`};
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  margin-bottom: 30px;

  @media (max-width: 550px) {
    margin-bottom: 0px;
    margin-top: 40px;
  }
`

FsiLogo.displayName = 'FsiLogo'

const Container = styled.div`
  background: #fff;
  position: relative;
  width: 95%;
  margin: 0 auto;
  margin-top: 10vh;
  padding: 80px;
  box-sizing: border-box;
  max-width: 1013px;
  min-height: 90vh;
  z-index: 900;
  opacity: 1;
  box-shadow: 0px 11px 44px rgba(0, 0, 0, 0.13);
  animation: ${props =>
    props.show
      ? `${slideIn} 0.35s ease-in-out forwards`
      : `${slideOut} 0.35s ease-in-out forwards`};
  @media (max-width: 660px) {
    margin-top: 0;
    width: 100%;
    border-radius: 0;
    border: none;
  }
  @media (max-width: 600px) {
    padding: 80px 30px;
  }
`

const SplitView = {
  Container: styled.div`
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
  `,
  Left: styled.div`
    display: flex;
    flex-flow: column;
    padding-right: 100px;
    box-sizing: border-box;
    width: 100%;
    max-width: 72%;

    @media (max-width: 900px) {
      padding-right: 0px;
      max-width: 100%;
    }
  `,
  Right: styled.div`
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    flex: 1;

    a {
      color: ${secondary};
    }
    a:hover {
      text-decoration: underline;
    }

    @media (max-width: 900px) {
      width: 100%;
      max-width: 100%;
    }
  `
}

const InformationContent = styled.div`
  width: 100%;
  padding: 0 0 40px 0;

  font-family: 'Helvetica Neue LT W02 55 Roman', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.015em;

  ul,
  ol {
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: inherit;
  }
  ol,
  ul {
    padding-left: 14px;
  }
  ul {
    list-style-image: url(${listIcon});
  }
  li {
    padding: 4px 0 4px 2px;
    line-height: 150%;
    &:first-child {
      padding-top: 0px;
    }
  }
`

const InformationTitle = styled.div`
  padding: 0 0 5px 0;
`

const CloseLink = styled.div`
  cursor: pointer;
`

import React, {Component} from 'react'
import styled from 'styled-components'
import {SVGIcon} from '../presentational/Icon'

import {primary} from '../presentational/Colors'

export default class FsiContact extends Component {

  render() {
    const contact = this.props.contact

    return (
      <>
        <Title>
          {contact.name || ''}
        </Title>
        <Adress>{contact.firstName} {contact.lastName}</Adress>
        <Adress>{contact.role || ''}</Adress>

        <AdressLinks>
          <Link href={'mailto:'+contact.email}>
            <SVGIcon path={'layout/contact-mail.svg'} fillColor={primary} />
          </Link>
          <Link href={'tel:'+contact.phone}>
            <SVGIcon path={'layout/contact-phone.svg'} fillColor={primary} />
          </Link>
          {contact.website && (
            <Link href={this.props.contact.website} target="_blank" rel="noopener noreferrer">
              <SVGIcon path={'layout/contact-www.svg'} fillColor={primary} />
            </Link>
          )}
        </AdressLinks>

        <Adress>{contact.street}</Adress>
        <Adress>
          {contact.zipCode} {contact.city}
        </Adress>
      </>
    )
  }
}

const Title = styled.div`
  color: #000;
  font-weight: 500;
`

const Adress = styled.div`
  font-weight: normal;
`

const AdressLinks = styled.div`
  display: flex;
  margin: 7px 0;
  a {
    margin: 3px 10px 2px 0;
  }
`

Adress.displayName = 'Adress'

const Link = styled.a`
  line-height: 1.3;
  margin-bottom: 2px;
  word-break: break-all;
`

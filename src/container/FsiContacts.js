import React, {Component} from 'react'
import styled from 'styled-components'

import FsiContact from './FsiContact'

export default class FsiContacts extends Component {
  render() {
    return (
      <Wrapper>
        {this.props.contacts.map(contact => {
          return (
            <Contact key={contact.id}>
              <FsiContact contact={contact} key={contact.id} />
            </Contact>
          )
        })}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
  @media (max-width: 765px) {
    flex-direction: column;
  }
`

const Contact = styled.div`
  flex: 1 1 50%;
  padding: 0 20px 20px 0;
  box-sizing: border-box;
`

import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {getParams} from './global/getParams'
import language from './helpers/setLanguage'
import strings from './strings'
import styled from 'styled-components'

import Layout from './layouts/Layout'
import getFsis from './api/getFsis'
import Overview from './container/Overview'
import Loading from './presentational/Loading'
import {setActiveFiltersFromUrl} from './data/transformFilter'

class Landing extends Component {
  state = {
    loading: true,
    fsis: [],
    filters: [],
    fsiId: null,
    error: false
  }

  componentDidMount() {
    const urlParams = getParams(this.props.location)

    getFsis(language)
      .then(data => {
        this.setState({
          fsis: data.subsidyPrograms,
          filters: setActiveFiltersFromUrl(data.filters, this.props.location),
          loading: false,
          fsiId: urlParams.query
        })
      })
      .catch(err => {
        this.setState({loading: false, error: true})
      })
  }

  pushQuery(fsi) {
    this.setState({
      fsiId: fsi.id
    })
  }

  removeQuery() {
    this.setState({
      fsiId: false
    })
  }

  renderContent() {
    if (this.state.loading) {
      return null
    } else if (this.state.error) {
      return <div style={{padding: 20}}>{strings.error}</div>
    } else {
      return (
        <Layout>
          <Router>
            <Route
              path="/"
              children={
                <Overview
                  fsis={this.state.fsis}
                  filters={this.state.filters}
                  fsiId={this.state.fsiId}
                />
              }
            />
          </Router>
        </Layout>
      )
    }
  }
  render() {
    return (
      <AppContainer>
        {this.state.loading && (
          <LoadingContainer opacity={this.state.loading ? 1 : 0}>
            {this.state.loading && <Loading inline />}
          </LoadingContainer>
        )}
        {this.renderContent()}
      </AppContainer>
    )
  }
}

export default withRouter(Landing)

const AppContainer = styled.div`
  position: relative;
  line-height: 1;
`

const LoadingContainer = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 36px;
  opacity: ${props => props.opacity};
  transition: opacity 1s ease;
`

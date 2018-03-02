import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'unistore/react'

import { actions } from '../../store'

import ShareDialog from './ShareDialog'

import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import Editor from '../../components/Editor'
import Logo from '../../components/Logo'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'

import {
  StyledMain,
  StyledHeader,
  StyledStatus,
  StyledSidebar,
  StyledSlidesContainer
} from './styles'

class SlidesEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    markdown: PropTypes.string,
    match: PropTypes.object.isRequired,
    setMarkdown: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  state = {
    isSharing: false,
    slideToFocus: 0
  }

  async componentDidMount() {
    const { history, loadMarkdown, match } = this.props
    const { slidesId } = match.params

    if (slidesId) {
      try {
        await loadMarkdown(slidesId)
      } catch (err) {
        console.error(err)
        history.push('/')
      }
    } else {
      this.setState({ isLoading: false })
    }
  }

  handleEditorChange = e => {
    const { history, match } = this.props
    const { slidesId } = match.params

    if (slidesId) {
      history.push('/')
    }

    this.props.setMarkdown(e.target.value)
  }

  handleEditorSlideChange = slide => this.setState({ slideToFocus: slide })

  handlePresentationClick = e => {
    const { history, match } = this.props
    const { slidesId } = match.params

    history.push(`presentation${slidesId ? `/${match.params.slidesId}` : ''}`)
  }

  handleShareClick = e => {
    this.setState({ isSharing: true })
  }

  handleClose = () => {
    this.setState({ isSharing: false })
  }

  render() {
    const { isSharing, slideToFocus } = this.state
    const { history, isLoading, markdown, theme } = this.props

    return (
      <StyledMain>
        <StyledHeader>
          <Logo />
          <StyledStatus>
            <ButtonGroup>
              <Button onClick={this.handlePresentationClick}>
                Presentation
              </Button>
              <Button onClick={this.handleShareClick}>Share</Button>
            </ButtonGroup>
          </StyledStatus>
        </StyledHeader>
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <StyledSidebar>
              <Editor
                onChange={this.handleEditorChange}
                onSlideChange={this.handleEditorSlideChange}
                value={markdown}
              />
            </StyledSidebar>
            <StyledSlidesContainer>
              <Slides
                markdown={markdown}
                slideToFocus={slideToFocus}
                theme={theme}
              />
            </StyledSlidesContainer>
          </Fragment>
        )}
        {isSharing && (
          <ShareDialog
            history={history}
            markdown={markdown}
            onClose={this.handleClose}
            theme={theme}
          />
        )}
      </StyledMain>
    )
  }
}

export default connect('isLoading, markdown, theme', actions)(SlidesEditor)

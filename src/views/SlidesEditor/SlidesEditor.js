import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'unistore/react'

import { saveSlides } from '../../firebase'
import { actions } from '../../store'

import ShareDialog from './ShareDialog'

import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import Editor from '../../components/Editor'
import Logo from '../../components/Logo'
import Notification from '../../components/Notification'
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
    isShared: false,
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

  handleGetUrlClick = () => {
    const { history, markdown, theme } = this.props

    saveSlides({ markdown, theme }).then(slidesId => {
      this.setState({ isSharing: false, isShared: true })
      history.push(slidesId)
    })
  }

  handleClose = () => {
    this.setState({ isSharing: false })
  }

  render() {
    const { isShared, isSharing, slideToFocus } = this.state
    const { isLoading, markdown, theme } = this.props

    return (
      <StyledMain>
        <StyledHeader>
          <Logo />
          <StyledStatus>
            {isShared && (
              <Notification>New URL created. Copy it to share.</Notification>
            )}
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
            onButtonClick={this.handleGetUrlClick}
            onClose={this.handleClose}
          />
        )}
      </StyledMain>
    )
  }
}

export default connect('isLoading, markdown, theme', actions)(SlidesEditor)

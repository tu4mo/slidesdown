import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import { getSlides, saveSlides } from '../../firebase'

import ShareDialog from './ShareDialog'

import Button from '../../components/Button'
import Editor from '../../components/Editor'
import Logo from '../../components/Logo'
import Notification from '../../components/Notification'
import Slides from '../../components/Slides'

import {
  StyledHeader,
  StyledStatus,
  StyledSidebar,
  StyledSlidesContainer
} from './styles'

const defaultMarkdown =
  '# Welcome to *Slidesdown*\n\n---\n\n' +
  '✨ Write markdown, get slides! ✨\n\n---\n\n' +
  '## A list!\n\n- Awesome\n\n1. Yeah!'

class SlidesEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    isLoading: true,
    isShared: false,
    isSharing: false,
    markdown: ''
  }

  componentDidMount() {
    const { history, match } = this.props
    const { slidesId } = match.params

    if (slidesId) {
      getSlides(slidesId)
        .then(slide => {
          this.setState({ isLoading: false, markdown: slide.markdown })
        })
        .catch(err => {
          console.error(err)
          this.setState({ isLoading: false })
          history.push('/')
        })
    } else {
      this.setState({
        isLoading: false,
        markdown: window.localStorage.getItem('markdown') || defaultMarkdown
      })
    }
  }

  handleEditorChange = e => {
    this.setState({ markdown: e.target.value })
    this.setLocalStorageItem(e.target.value)
  }

  handleShareClick = e => {
    this.setState({ isSharing: true })
  }

  handleGetUrlClick = () => {
    saveSlides({ markdown: this.state.markdown }).then(slidesId => {
      this.setState({ isSharing: false, isShared: true })
      this.props.history.push(slidesId)
    })
  }

  handleClose = () => {
    this.setState({ isSharing: false })
  }

  setLocalStorageItem = throttle(
    value => window.localStorage.setItem('markdown', value),
    1000
  )

  render() {
    const { isLoading, isShared, isSharing, markdown } = this.state

    return (
      <Fragment>
        <StyledHeader>
          <Logo />
          <StyledStatus>
            {isShared && (
              <Notification>New URL created. Copy it to share.</Notification>
            )}
            <Button disabled={isShared} onClick={this.handleShareClick}>
              Share
            </Button>
          </StyledStatus>
        </StyledHeader>
        {!isLoading && (
          <Fragment>
            <StyledSidebar>
              <Editor onChange={this.handleEditorChange} value={markdown} />
            </StyledSidebar>
            <StyledSlidesContainer>
              <Slides markdown={markdown} />
            </StyledSlidesContainer>
          </Fragment>
        )}
        {isSharing && (
          <ShareDialog
            onButtonClick={this.handleGetUrlClick}
            onClose={this.handleClose}
          />
        )}
      </Fragment>
    )
  }
}

export default SlidesEditor

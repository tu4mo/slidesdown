import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { getSlides, saveSlides } from '../../firebase'

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

class SlidesEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    markdown:
      '# Welcome to *Slidesdown*\n\n---\n\n' +
      '✨ Write markdown, get slides! ✨\n\n---\n\n' +
      '## A list!\n\n- Awesome\n\n1. Yeah!',
    isLoading: true,
    isShared: false
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
      this.setState({ isLoading: false })
    }
  }

  handleEditorChange = e => {
    this.setState({ markdown: e.target.value })
  }

  handleShareClick = e => {
    saveSlides({ markdown: this.state.markdown }).then(slidesId => {
      this.setState({ isShared: true })
      this.props.history.push(slidesId)
    })
  }

  render() {
    const { isLoading, isShared, markdown } = this.state

    return (
      <Fragment>
        <StyledHeader>
          <Logo />
          <StyledStatus>
            {isShared && (
              <Notification>New URL created. Copy it to share.</Notification>
            )}
            <Button onClick={this.handleShareClick}>Share</Button>
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
      </Fragment>
    )
  }
}

export default SlidesEditor

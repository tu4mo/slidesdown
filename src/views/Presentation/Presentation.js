import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'unistore/react'

import { actions } from '../../store'

import Notification from '../../components/Notification'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'

import { StyledPresentation, StyledNoticationContainer } from './styles'

const splitMarkdownToSlides = markdown => markdown.split('---')

class Presentation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    markdown: PropTypes.string,
    match: PropTypes.object.isRequired
  }

  async componentDidMount() {
    const { history, loadMarkdown, match } = this.props
    const { slidesId } = match.params

    if (slidesId && slidesId !== '-') {
      try {
        await loadMarkdown(slidesId)
      } catch (err) {
        console.error(err)
        history.push('/')
      }
    }

    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  changeSlide = (next = true) => {
    const { history, markdown, match } = this.props
    const { slidesId = '-', slideNumber = 0 } = match.params
    const getSlideUrl = slideNumber =>
      `/presentation/${slidesId}/${slideNumber}`

    if (next) {
      if (slideNumber < splitMarkdownToSlides(markdown).length - 1) {
        history.push(getSlideUrl(parseInt(slideNumber, 10) + 1))
      }
    } else {
      if (slideNumber > 0) {
        history.push(getSlideUrl(parseInt(slideNumber, 10) - 1))
      }
    }
  }

  handleKeyUp = e => {
    const { history, match } = this.props
    const { slidesId = '' } = match.params

    switch (e.keyCode) {
      case 27: // ESC
        history.push(`/${slidesId !== '-' ? slidesId : ''}`)
        break
      case 37: // Left arrow
        this.changeSlide(false)
        break
      case 39: // Right arrow
        this.changeSlide()
        break
      case 32: // Space
        this.changeSlide()
        break
    }
  }

  render() {
    const { isLoading, markdown, match } = this.props
    const { slideNumber = 0 } = match.params

    return isLoading ? (
      <Spinner />
    ) : (
      <StyledPresentation onClick={this.changeSlide}>
        <Slides
          isSingle
          markdown={splitMarkdownToSlides(markdown)[slideNumber]}
        />
        <StyledNoticationContainer>
          <Notification timeout="4000">
            Press ESC to exit, space or arrows to change slide.
          </Notification>
        </StyledNoticationContainer>
      </StyledPresentation>
    )
  }
}

export default connect('isLoading, markdown', actions)(Presentation)

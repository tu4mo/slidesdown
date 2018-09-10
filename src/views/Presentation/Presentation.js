import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fullscreen from 'react-full-screen'

import { getPresentation } from '../../firebase'

import Icon from '../../components/Icon'
import Key from '../../components/Key'
import Notification from '../../components/Notification'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'
import ToolBar from '../../components/ToolBar'

import {
  StyledPresentation,
  StyledNoticationContainer,
  StyledPresentationToolbar
} from './Presentation.style'

class Presentation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    isFullscreen: false,
    isLoading: true,
    isToolbarVisible: false,
    markdown: '',
    theme: ''
  }

  slidesCount = 0
  toolbarVisibilityTimer = null

  async componentDidMount() {
    const { history, match } = this.props
    const { slidesId } = match.params

    if (slidesId && slidesId !== '-') {
      try {
        const slides = await getPresentation(slidesId)

        this.setState({
          isLoading: false,
          markdown: slides.markdown,
          theme: slides.theme
        })
      } catch (err) {
        history.push('/')
      }
    }

    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
    clearTimeout(this.toolbarVisibilityTimer)
  }

  changeSlide = (next = true) => {
    const { history, match } = this.props
    const { slidesId = '-', slideNumber = 0 } = match.params
    const getSlideUrl = slideNumber => `/${slidesId}/${slideNumber}`

    if (next) {
      if (slideNumber < this.slidesCount - 1) {
        history.push(getSlideUrl(parseInt(slideNumber, 10) + 1))
      }
    } else {
      if (slideNumber > 0) {
        history.push(getSlideUrl(parseInt(slideNumber, 10) - 1))
      }
    }
  }

  close = () => {
    const { history, match } = this.props
    const { slidesId = '' } = match.params
    history.push(`/${slidesId !== '-' ? slidesId : ''}`)
  }

  handleKeyUp = e => {
    switch (e.keyCode) {
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

  handleSlidesCount = count => (this.slidesCount = count)

  handlePresentationMouseMove = e => {
    if (!this.state.isToolbarVisible) {
      this.setState({
        isToolbarVisible: true
      })
    }

    clearTimeout(this.toolbarVisibilityTimer)

    this.toolbarVisibilityTimer = setTimeout(
      () =>
        this.setState({
          isToolbarVisible: false
        }),
      2000
    )
  }

  handleToolbarMouseMove = e => {
    e.stopPropagation()
    clearTimeout(this.toolbarVisibilityTimer)
  }

  render() {
    const { match } = this.props
    const {
      isFullscreen,
      isLoading,
      isToolbarVisible,
      markdown,
      theme
    } = this.state
    const { slideNumber: slideNumberAsString = '0' } = match.params
    const slideNumber = parseInt(slideNumberAsString, 10)

    return isLoading ? (
      <Spinner />
    ) : (
      <Fullscreen
        enabled={isFullscreen}
        onChange={isFullscreen => this.setState({ isFullscreen })}
      >
        <StyledPresentation onMouseMove={this.handlePresentationMouseMove}>
          <Slides
            markdown={markdown}
            onSlidesCount={this.handleSlidesCount}
            singleSlide={slideNumber}
            theme={theme}
          />
          <StyledNoticationContainer>
            <Notification slideDown timeout={5000}>
              Press space or arrows to change slide.
            </Notification>
          </StyledNoticationContainer>
          <StyledPresentationToolbar
            onMouseMove={this.handleToolbarMouseMove}
            visible={isToolbarVisible}
          >
            <ToolBar>
              <Icon
                disabled={slideNumber === 0}
                onClick={() => this.changeSlide(false)}
                tooltip={
                  <span>
                    Previous <Key>←</Key>
                  </span>
                }
                type="left"
              />
              {isFullscreen ? (
                <Icon
                  onClick={() =>
                    this.setState({
                      isFullscreen: false
                    })
                  }
                  tooltip={<span>Minimize</span>}
                  type="minimize"
                />
              ) : (
                <Icon
                  onClick={() => this.setState({ isFullscreen: true })}
                  tooltip={<span>Maximize</span>}
                  type="maximize"
                />
              )}
              <Icon
                disabled={slideNumber >= this.slidesCount - 1}
                onClick={this.changeSlide}
                tooltip={
                  <span>
                    Next <Key>→</Key> / <Key>space</Key>
                  </span>
                }
                type="right"
              />
            </ToolBar>
          </StyledPresentationToolbar>
        </StyledPresentation>
      </Fullscreen>
    )
  }
}

export default Presentation

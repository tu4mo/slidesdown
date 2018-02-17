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
    match: PropTypes.object.isRequired,
    markdown: PropTypes.string.isRequired,
    onEditorChange: PropTypes.func.isRequired
  }

  state = {
    isLoading: true,
    isShared: false
  }

  componentDidMount() {
    const { history, match, onEditorChange } = this.props
    const { slidesId } = match.params

    if (slidesId) {
      getSlides(slidesId)
        .then(slide => {
          onEditorChange(slide.markdown)
          this.setState({ isLoading: false })
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

  handleShareClick = e => {
    const { history, markdown } = this.props

    saveSlides({ markdown }).then(slidesId => {
      this.setState({ isShared: true })
      history.push(slidesId)
    })
  }

  render() {
    const { markdown, onEditorChange } = this.props
    const { isLoading, isShared } = this.state

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
              <Editor
                onChange={e => onEditorChange(e.target.value)}
                value={markdown}
              />
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

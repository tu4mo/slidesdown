import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'
import { connect } from 'unistore/react'

import { saveSlides } from '../../../firebase'
import { actions } from '../../../store'

import Button from '../../../components/Button'

import {
  StyledInstructions,
  StyledInstruction,
  StyledNumber,
  StyledDetails,
  StyledFooter,
  StyledURL
} from './ShareDialog.style'

class ShareDialog extends Component {
  static propTypes = {
    createNewId: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    newId: PropTypes.string.isRequired,
    markdown: PropTypes.string,
    theme: PropTypes.string.isRequired
  }

  state = {
    copied: false,
    shareURL: null
  }

  handleCreateURLClick = () => {
    const { createNewId, history, newId, markdown, theme } = this.props

    saveSlides({ id: newId, markdown, theme }).then(() => {
      history.push(newId)
      this.setState({ shareURL: window.location.href })
      createNewId()
    })
  }

  render() {
    const { copied, shareURL } = this.state

    return (
      <Fragment>
        <StyledInstructions>
          <StyledInstruction>
            <StyledNumber>1.</StyledNumber>
            Clicking <strong>Create URL</strong> will save your slides to a
            unique URL.
          </StyledInstruction>
          <StyledInstruction>
            <StyledNumber>2.</StyledNumber>
            Anyone can access this URL, but no one, including you, can edit or
            remove&sup1; it.
          </StyledInstruction>
          <StyledInstruction>
            <StyledNumber>3.</StyledNumber>
            You can make changes to the slides and share them with a new URL.
          </StyledInstruction>
        </StyledInstructions>
        <StyledDetails>
          &sup1;) Slides will be removed after 30 continuous days of no
          visitors.
        </StyledDetails>
        <StyledFooter>
          {shareURL ? (
            <Fragment>
              <StyledURL>{shareURL}</StyledURL>
              <CopyToClipboard
                onCopy={() => this.setState({ copied: true })}
                text={shareURL}
              >
                <Button>{copied ? 'Copied' : 'Copy URL to Clipboard'}</Button>
              </CopyToClipboard>
            </Fragment>
          ) : (
            <Button onClick={this.handleCreateURLClick}>Create URL</Button>
          )}
        </StyledFooter>
      </Fragment>
    )
  }
}

export default connect('markdown, newId, theme', actions)(ShareDialog)

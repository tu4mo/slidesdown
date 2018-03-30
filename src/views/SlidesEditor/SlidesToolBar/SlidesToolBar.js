import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ButtonGroup from '../../../components/ButtonGroup'
import Icon from '../../../components/Icon'
import Logo from '../../../components/Logo'
import ToolBar from '../../../components/ToolBar'

import { StyledToolBarContainer, StyledLogoContainer } from './styles'

class SlidesToolBar extends Component {
  static propTypes = {
    onPresentationClick: PropTypes.func.isRequired,
    onShareClick: PropTypes.func.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { onPresentationClick, onShareClick } = this.props

    return (
      <StyledToolBarContainer>
        <ToolBar>
          <StyledLogoContainer>
            <Logo />
          </StyledLogoContainer>
          <ButtonGroup>
            <Icon
              onClick={onPresentationClick}
              tooltip="Presentation"
              type="presentation"
            />
            <Icon onClick={onShareClick} tooltip="Share" type="share" />
          </ButtonGroup>
        </ToolBar>
      </StyledToolBarContainer>
    )
  }
}

export default SlidesToolBar

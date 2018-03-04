import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ButtonGroup from '../../../components/ButtonGroup'
import Icon from '../../../components/Icon'
import Logo from '../../../components/Logo'

import { StyledToolBar, StyledLogoContainer } from './styles'

class ToolBar extends Component {
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
      <StyledToolBar>
        <StyledLogoContainer>
          <Logo />
        </StyledLogoContainer>
        <ButtonGroup>
          <Icon
            onClick={onPresentationClick}
            title="Presentation"
            type="presentation"
          />
          <Icon onClick={onShareClick} title="Share" type="share" />
        </ButtonGroup>
      </StyledToolBar>
    )
  }
}

export default ToolBar

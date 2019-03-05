import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ButtonGroup from '../../../components/ButtonGroup'
import Icon from '../../../components/Icon'
import Logo from '../../../components/Logo'
import ToolBar from '../../../components/ToolBar'
import Tooltip from '../../../components/Tooltip'

import {
  StyledToolBarContainer,
  StyledLogoContainer
} from './SlidesToolBar.style'

import About from './About'

const SlidesToolBar = ({ isSaving, onPresentationClick }) => {
  const [isAboutVisible, setIsAboutVisible] = useState(false)

  return (
    <>
      <StyledToolBarContainer>
        <ToolBar>
          <StyledLogoContainer withNotification={isSaving}>
            <Tooltip html="About Slidesdown">
              <Logo onClick={() => setIsAboutVisible(true)} />
            </Tooltip>
          </StyledLogoContainer>
          <ButtonGroup>
            <Icon
              alt="Presentation"
              onClick={onPresentationClick}
              tooltip="Presentation"
              type="presentation"
            />
          </ButtonGroup>
        </ToolBar>
      </StyledToolBarContainer>
      {isAboutVisible && <About onClose={() => setIsAboutVisible(false)} />}
    </>
  )
}

SlidesToolBar.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  onPresentationClick: PropTypes.func.isRequired
}

export default SlidesToolBar

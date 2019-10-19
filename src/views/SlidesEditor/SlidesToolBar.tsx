import React, { useState } from 'react'

import ButtonGroup from '../../components/ButtonGroup'
import Icon from '../../components/Icon'
import Logo from '../../components/Logo'
import ToolBar from '../../components/ToolBar'
import Tooltip from '../../components/Tooltip'

import {
  StyledToolBarContainer,
  StyledLogoContainer,
  StyledIconWrapper
} from './SlidesToolBar.style'

import About from './About'

interface Props {
  isSaving: boolean
  onPresentationClick(): void
}

const SlidesToolBar = ({ isSaving, onPresentationClick }: Props) => {
  const [isAboutVisible, setIsAboutVisible] = useState(false)

  return (
    <>
      <StyledToolBarContainer>
        <ToolBar>
          <StyledLogoContainer>
            <Tooltip content="About Slidesdown">
              <Logo onClick={() => setIsAboutVisible(true)} />
            </Tooltip>
          </StyledLogoContainer>
          <ButtonGroup>
            <StyledIconWrapper withNotification={isSaving}>
              <Icon
                alt="Presentation"
                onClick={onPresentationClick}
                tooltip="Presentation"
                type="presentation"
              />
            </StyledIconWrapper>
          </ButtonGroup>
        </ToolBar>
      </StyledToolBarContainer>
      {isAboutVisible && <About onClose={() => setIsAboutVisible(false)} />}
    </>
  )
}

export default SlidesToolBar

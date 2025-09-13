import { useState } from 'react'

import { Icon } from '../../components/Icon'
import { Logo } from '../../components/Logo'
import { ToolBar } from '../../components/ToolBar'
import { Tooltip } from '../../components/Tooltip'

import {
  StyledToolBarContainer,
  StyledLogoContainer,
  StyledIconWrapper,
} from './SlidesToolBar.style'

import { About } from './About'

type Props = {
  isSaving: boolean
  onPresentationClick(): void
}

function SlidesToolBar({ isSaving, onPresentationClick }: Props) {
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
          <StyledIconWrapper $withNotification={isSaving}>
            <Icon
              alt="Presentation"
              onClick={onPresentationClick}
              tooltip="Presentation"
              type="presentation"
            />
          </StyledIconWrapper>
        </ToolBar>
      </StyledToolBarContainer>
      {isAboutVisible && <About onClose={() => setIsAboutVisible(false)} />}
    </>
  )
}

export { SlidesToolBar }

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../../../components/Button'

const StyledDialogContainer = styled.div`
  align-items: center;
  background-color: rgba(51, 51, 51, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
`

const StyledDialog = styled.div`
  background-color: #fff;
  padding: 2rem;
  max-width: 720px;
`

const StyledHeading = styled.h2`
  margin: 0;
`

const StyledInstructions = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 2rem;
  }
`

const StyledInstruction = styled.div`
  color: ${props => props.theme.colors.lightText};
  flex: 1 1 33.33%;
`

const StyledNumber = styled.div`
  color: ${props => props.theme.colors.purple};
  font-size: 5rem;
`

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const StyledDetails = styled.div`
  color: ${props => props.theme.colors.dimText};
  font-size: 0.75rem;
  margin-top: 1rem;
`

const ShareDialog = ({ onClose, onButtonClick }) => (
  <StyledDialogContainer onClick={onClose}>
    <StyledDialog onClick={e => e.stopPropagation()}>
      <StyledHeading>How sharing works</StyledHeading>
      <StyledInstructions>
        <StyledInstruction>
          <StyledNumber>1.</StyledNumber>
          Clicking <strong>Get URL</strong> will give you an unique URL to your
          slides.
        </StyledInstruction>
        <StyledInstruction>
          <StyledNumber>2.</StyledNumber>
          Anyone can access these URLs, but no one, including you, can't edit or
          remove&sup1; them.
        </StyledInstruction>
        <StyledInstruction>
          <StyledNumber>3.</StyledNumber>
          You can make changes to the slides and share them with a new URL.
        </StyledInstruction>
      </StyledInstructions>
      <StyledDetails>
        &sup1;) Slides will be removed after 30 continuous days of no visitors.
      </StyledDetails>
      <StyledFooter>
        <Button onClick={onButtonClick}>Get URL</Button>
      </StyledFooter>
    </StyledDialog>
  </StyledDialogContainer>
)

ShareDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
}

export default ShareDialog

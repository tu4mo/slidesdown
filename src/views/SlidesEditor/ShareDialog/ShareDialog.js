import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../../../components/Button'
import Modal from '../../../components/Modal'

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
  <Modal onClose={onClose}>
    <StyledHeading>How sharing works</StyledHeading>
    <StyledInstructions>
      <StyledInstruction>
        <StyledNumber>1.</StyledNumber>
        Clicking <strong>Create URL</strong> will save your slides to a unique
        URL.
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
      &sup1;) Slides will be removed after 30 continuous days of no visitors.
    </StyledDetails>
    <StyledFooter>
      <Button onClick={onButtonClick}>Create URL</Button>
    </StyledFooter>
  </Modal>
)

ShareDialog.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ShareDialog

import React from 'react'

import Logo from '../../components/Logo'
import Modal from '../../components/Modal'

import { StyledAbout, StyledHeading } from './About.style'

interface Props {
  onClose(): void
}

const About = ({ onClose }: Props) => (
  <Modal onClose={onClose}>
    <StyledAbout>
      <Logo large />
      <StyledHeading>Write&nbsp;markdown, get&nbsp;slides</StyledHeading>
      <a
        href="https://github.com/tu4mo/slidesdown"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </StyledAbout>
  </Modal>
)

export default About

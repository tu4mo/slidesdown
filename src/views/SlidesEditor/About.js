import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../../components/Logo'
import Modal from '../../components/Modal'

import { StyledAbout, StyledHeading } from './About.style'

const About = ({ onClose }) => (
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

About.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default About

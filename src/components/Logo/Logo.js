import React from 'react'
import styled from 'styled-components'

import logoSvg from './logo.svg'

const StyledImg = styled.img`
  height: 2rem;
  width: 2rem;
`

const Logo = () => (
  <StyledImg alt="Slidesdown" src={logoSvg} title="Slidesdown" />
)

export default Logo

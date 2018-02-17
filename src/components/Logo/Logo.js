import React from 'react'
import styled from 'styled-components'

import logoSvg from './logo.svg'

const StyledLogo = styled.div`
  align-items: center;
  font-family: Montserrat;
  font-weight: bold;
  display: flex;
`

const StyledImg = styled.img`
  height: 40px;
  margin-right: 0.5rem;
`

const Logo = () => (
  <StyledLogo>
    <StyledImg src={logoSvg} /> Slidesdown
  </StyledLogo>
)

export default Logo

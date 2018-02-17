import React from 'react'
import styled from 'styled-components'

import logoSvg from './logo.svg'

const StyledLogo = styled.div`
  align-items: center;
  font-weight: bold;
  display: flex;
`

const StyledImg = styled.img`
  height: 40px;
  margin-right: 0.5rem;
  width: 40px;
`

const Logo = () => (
  <StyledLogo>
    <StyledImg src={logoSvg} /> Slidesdown
  </StyledLogo>
)

export default Logo

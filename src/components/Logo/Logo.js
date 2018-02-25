import React from 'react'
import styled from 'styled-components'

import logoSvg from './logo.svg'

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-weight: bold;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    font-size: 1rem;
  }
`

const StyledImg = styled.img`
  height: 40px;
  width: 40px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-right: 0.5rem;
  }
`

const Logo = () => (
  <StyledLogo>
    <StyledImg src={logoSvg} /> Slidesdown
  </StyledLogo>
)

export default Logo

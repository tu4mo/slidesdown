import styled from 'styled-components'

export const StyledSidebar = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    border: 0;
  }
`

export const StyledSlidesContainer = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`

export const StyledToolBar = styled.div`
  background-color: #fff;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 2rem;
  bottom: 1rem;
  display: flex;
  padding: 1rem;
  position: absolute;
  right: 1rem;
`

export const StyledLogoContainer = styled.div`
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  margin-bottom: -1rem;
  margin-right: 1rem;
  margin-top: -1rem;
  padding-right: 1rem;
`

import styled from 'styled-components'

export const StyledMain = styled.div`
  display: grid;
  grid-template: 'editor' 1fr 'slides' 1fr;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template: 'editor slides' auto / 1fr 3fr;
  }
`

export const StyledSidebar = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  grid-area: editor;
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    border: 0;
    border-right: 1px solid ${props => props.theme.colors.border};
  }
`

export const StyledSlidesContainer = styled.div`
  grid-area: slides;
  position: relative;
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

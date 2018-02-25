import styled from 'styled-components'

export const StyledMain = styled.div`
  display: grid;
  grid-template: 'header' 64px 'editor' 1fr 'slides' 1fr;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template: 'header header' 64px 'editor slides' auto / 1fr 3fr;
  }
`

export const StyledHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  grid-area: header;
  justify-content: space-between;
  padding: 0 1rem;
`

export const StyledStatus = styled.div`
  align-items: center;
  display: flex;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`

export const StyledSidebar = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  grid-area: editor;
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    border-right: 1px solid ${props => props.theme.colors.border};
  }
`

export const StyledSlidesContainer = styled.div`
  grid-area: slides;
  position: relative;
`

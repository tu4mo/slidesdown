import styled from 'styled-components'

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
  border-right: 1px solid ${props => props.theme.colors.border};
  grid-area: editor;
  position: relative;
`

export const StyledSlidesContainer = styled.div`
  grid-area: slides;
  position: relative;
`

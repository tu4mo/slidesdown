import styled from 'styled-components'

export const StyledInstructions = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 -1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
  }

  & > * {
    padding: 0 1rem;
  }
`

export const StyledInstruction = styled.div`
  color: ${props => props.theme.colors.lightText};
  flex: 1 1 33.33%;
`

export const StyledNumber = styled.div`
  color: ${props => props.theme.colors.purple};
  font-size: 5rem;
`

export const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

export const StyledDetails = styled.div`
  color: ${props => props.theme.colors.dimText};
  font-size: 0.75rem;
  margin-top: 1rem;
`

export const StyledURL = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.lightText};
  flex: 1 1 auto;
  padding: 0.5rem;
  overflow: auto;
  white-space: nowrap;
`

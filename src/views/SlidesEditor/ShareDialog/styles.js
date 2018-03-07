import styled from 'styled-components'

export const StyledHeading = styled.h2`
  margin: 0;
`

export const StyledInstructions = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 2rem;
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

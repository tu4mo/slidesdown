import styled from 'styled-components'

export const StyledPresentation = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

export const StyledNoticationContainer = styled.div`
  top: 1rem;
  position: fixed;
`

interface Props {
  visible?: boolean
}

export const StyledPresentationToolbar = styled.div<Props>`
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  padding: 2rem;
  position: fixed;
  transition: opacity 0.1s ease-in;
  width: 100%;
`

import styled from 'styled-components'

export const StyledWrapper = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const StyledTextarea = styled.textarea`
  border: 0;
  caret-color: ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.lightText};
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: 16px;
  height: 100%;
  left: 0;
  outline: none;
  padding: 1rem;
  position: absolute;
  top: 0;
  resize: none;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  &:disabled {
    opacity: 0.2;
  }

  &::selection {
    background-color: ${(props) => props.theme.colors.purple};
    color: #fff;
  }
`

interface Props {
  progress: number
}

export const StyledProgressBar = styled.div<Props>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;

  &::after {
    background-image: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.purple} 0%,
      ${(props) => props.theme.colors.purple} ${(props) => props.progress}%,
      #fff ${(props) => props.progress}%,
      #fff 100%
    );
    border: 2px solid ${(props) => props.theme.colors.purple};
    border-radius: 1rem;
    content: '';
    height: 1rem;
    display: block;
    width: 100%;
  }
`

import styled from 'styled-components'

export const StyledWrapper = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const StyledTextarea = styled.textarea`
  background-color: var(--color-editor);
  border: 0;
  caret-color: var(--color-purple);
  color: var(--color-light-text);
  font-family: var(--font-monospace);
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
    background-color: var(--color-purple);
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
      var(--color-purple) 0%,
      var(--color-purple) ${(props) => props.progress}%,
      #fff ${(props) => props.progress}%,
      #fff 100%
    );
    border: 2px solid var(--color-purple);
    border-radius: 1rem;
    content: '';
    height: 1rem;
    display: block;
    width: 100%;
  }
`

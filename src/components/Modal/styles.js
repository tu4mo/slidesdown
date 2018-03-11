import styled from 'styled-components'

export const StyledModalContainer = styled.div`
  animation: fade-modal-container 0.5s ease-out;
  align-items: center;
  background-color: rgba(51, 51, 51, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  @keyframes fade-modal-container {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const StyledModal = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  max-width: 720px;
  min-height: 240px;
  min-width: 320px;
  padding: 2rem;
  position: relative;
`

export const StyledModalCloseButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  height: 1.5rem;
  outline: none;
  padding: 0;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1.5rem;

  &::after,
  &::before {
    background-color: ${props => props.theme.colors.purple};
    border-radius: 1px;
    content: '';
    display: block;
    height: 2px;
    transform: rotate(45deg);
    position: absolute;
    width: 1.5rem;
  }

  &::before {
    transform: rotate(135deg);
  }
`

export const StyledHeading = styled.h2`
  margin: 0;
`

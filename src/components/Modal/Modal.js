import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledModalContainer = styled.div`
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
`

const StyledModal = styled.div`
  background-color: #fff;
  max-width: 720px;
  min-height: 240px;
  min-width: 320px;
  padding: 2rem;
  position: relative;
`

const StyledModalCloseButton = styled.button`
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
    content: '';
    display: block;
    height: 1px;
    transform: rotate(45deg);
    position: absolute;
    width: 1.5rem;
  }

  &::before {
    transform: rotate(135deg);
  }
`

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onClose()
    }
  }

  render() {
    const { children, onClose } = this.props

    return (
      <StyledModalContainer onClick={onClose}>
        <StyledModal onClick={e => e.stopPropagation()}>
          {children}
          <StyledModalCloseButton onClick={onClose} />
        </StyledModal>
      </StyledModalContainer>
    )
  }
}

export default Modal

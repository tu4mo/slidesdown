import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledImageContainer = styled.span`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`

class Image extends PureComponent {
  static propTypes = {
    src: PropTypes.string
  }

  render() {
    const { src } = this.props

    return (
      <StyledImageContainer>
        <img src={src} />
      </StyledImageContainer>
    )
  }
}

export default Image

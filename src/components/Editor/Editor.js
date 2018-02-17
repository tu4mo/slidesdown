import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTextarea = styled.textarea`
  border: 0;
  font-family: Inconsolata;
  font-size: 16px;
  height: 100%;
  left: 0;
  outline: none;
  padding: 1rem;
  position: absolute;
  top: 0;
  resize: none;
  width: 100%;
`

const Editor = ({ onChange, value }) => (
  <StyledTextarea
    autoFocus
    onChange={onChange}
    placeholder="Write markdown here"
    value={value}
  />
)

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default Editor

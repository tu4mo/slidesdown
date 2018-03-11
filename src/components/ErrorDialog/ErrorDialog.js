import React from 'react'
import PropTypes from 'prop-types'

const ErrorDialog = ({ error }) => <div>{error}</div>

ErrorDialog.propTypes = {
  error: PropTypes.string
}

export default ErrorDialog

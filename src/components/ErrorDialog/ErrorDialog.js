import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

const ErrorDialog = ({ error, onClose }) => (
  <Modal heading="Error" onClose={onClose}>
    {error}
  </Modal>
)

ErrorDialog.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ErrorDialog

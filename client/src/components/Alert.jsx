import React from 'react'
import Alert from '@material-ui/lab/Alert'

function SimpleAlert({ text, success }) {
  const severity = success ? 'success' : 'error'
  return <Alert severity={severity}>{text}</Alert>
}

export default SimpleAlert

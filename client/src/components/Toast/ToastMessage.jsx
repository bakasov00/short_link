import React from 'react'
import Alert from '@material-ui/lab/Alert'

import { makeStyles, Typography } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    top: 25,
    left: 0,
    maxWidth: 500,
    minWidth: 300,
    marginBottom: '15px ',
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
  },
})

function ToastMessage({ id, text, flag, toastRemove }) {
  const classes = useStyles()
  React.useEffect(() => {
    if (toastRemove) {
      setTimeout(() => {
        toastRemove(id)
      }, 3000)
    }
  }, [toastRemove])

  return (
    <div className={classes.root}>
      <Alert className={classes.flex} severity={flag}>
        <Typography component='span'>{text}</Typography>
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={() => toastRemove(id)}
          size='small'
          color={flag === 'success' ? 'primary' : 'secondary'}>
          <HighlightOffIcon />
        </IconButton>
      </Alert>
    </div>
  )
}

export default ToastMessage

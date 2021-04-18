import React from 'react'
import ToastMessage from './ToastMessage.jsx'
import { makeStyles, Box } from '@material-ui/core'
import uuid from 'react-uuid'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '100%',
    maxHeight: '100vh',
    zIndex: 50,
  },
})

export const useToast = () => {
  const [toasts, setToasts] = React.useState([])

  const toastShow = (toast) => {
    toast.id = uuid()
    setToasts([...toasts, toast])
  }

  const toastRemove = (id) => {
    setToasts((prev) => prev.filter((item) => item.id != id))
  }

  return {
    toastShow,
    toasts,
    toastRemove,
  }
}

function Toast({ toastRemove, toasts }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {toasts.length
        ? toasts.map((item, i) => (
            <ToastMessage
              key={i}
              id={item.id}
              text={item.message}
              flag={item.flag}
              toastRemove={toastRemove}
            />
          ))
        : ''}
    </div>
  )
}

export default Toast

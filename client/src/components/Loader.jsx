import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
)

function Loader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color='primary' />
    </div>
  )
}

export default Loader

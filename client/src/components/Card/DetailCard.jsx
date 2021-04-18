import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import { CopyClipboard } from '..'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    maxWidth: '1000px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'underline',
  },
})

function DetailCard({ link }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h5' className={classes.link} gutterBottom>
              <a href={link.to} target='_blank' _blank='true' rel='noreferrer'>
                {link.to}
              </a>
            </Typography>
          </Grid>
          <Grid item>
            <CopyClipboard link={link.to} />
          </Grid>
        </Grid>
        <Typography className={classes.link} component='p' gutterBottom>
          <a href={link.from} target='_blank' _blank='true' rel='noreferrer'>
            {link.from}
          </a>
        </Typography>
        <Typography variant='h6'>Количество кликов {link.clicks}</Typography>
      </CardContent>
    </Card>
  )
}

export default DetailCard

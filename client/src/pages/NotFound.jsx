import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Grid container alignItems='center' direction='column' spacing={2}>
      <Grid item>
        <Typography variant='h4'>Not Found</Typography>
      </Grid>
      <Grid item>
        <Button variant='outlined' color='primary'>
          <Link to='/auth/signin'> Войти </Link>
        </Button>
      </Grid>
    </Grid>
  )
}

export default NotFound

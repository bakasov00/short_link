import React from 'react'
import { Card, Button, Typography, CardContent } from '@material-ui/core'

import { Alert, CopyClipboard } from '..'

function SimpleCard({ link }) {
  return (
    <Card>
      <CardContent
        style={{
          display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <CopyClipboard link={link.to} />
        <Typography variant='h6'>
          <a href={link.to} target='_blank' _blank='true' rel='noreferrer'>
            {link.to}
          </a>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SimpleCard

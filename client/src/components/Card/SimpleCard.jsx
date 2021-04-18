import React from 'react'
import { Card, Typography, CardContent } from '@material-ui/core'

import { CopyClipboard } from '..'

function SimpleCard({ link }) {
  return (
    <Card style={{ marginBottom: 25 }}>
      <CardContent
        style={{
          display: 'flex',
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

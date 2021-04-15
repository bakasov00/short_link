import React from 'react'
// import DeleteIcon from '@material-ui/icons/Delete'
// import { useDispatch } from 'react-redux'

import { Typography, Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core'
// import { deleteLink, getAllLinks } from '../redux/actions/linkActions'
import { LinkCard } from '../components'

// const useStyles = makeStyles({
//   table: {
//     minWidth: 300,
//   },
//   tableCell: {
//     wordBreak: 'break-all',
//     maxWidth: 350,
//   },
//   delete: {
//     width: 20,
//   },
// })

function LinksList({ links }) {
  if (links.length === 0) {
    return <Typography>Нет ссылок</Typography>
  }

  return (
    <Grid container direction='column' spacing={5}>
      {links.map((link, i) => {
        return <LinkCard key={i} link={link} />
      })}
    </Grid>
  )
}

export default LinksList

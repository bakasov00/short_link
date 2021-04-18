import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, Alert } from '..'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Card, Button, CardContent, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { deleteLink } from '../../redux/actions/linkActions'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import FileCopyIcon from '@material-ui/icons/FileCopy'

import IconButton from '@material-ui/core/IconButton'
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  root: {
    minWidth: 267,
    margin: '25px 0',
  },

  title: {
    fontSize: 18,
    color: '#000',
  },
  link: {
    maxWidth: '1000px',
    minWidth: 280,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'underline',
    fontWeight: 500,
  },
})

function LinkCard({ link }) {
  const { loading } = useSelector(({ linkReducer }) => linkReducer)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [copyValue, setCopyValue] = React.useState({ value: '', copied: false })

  function deleteHandler(id, link) {
    // const isDelete = window.confirm(`Вы хотите удалить ссылку: ${link} `, ' ')
    // if (isDelete) {
    //   dispatch(deleteLink(id))
    // }
    dispatch(deleteLink(id))
  }

  function copyHandler() {
    setCopyValue({ copied: true })
    setTimeout(() => {
      setCopyValue({ copied: false })
    }, 3000)
  }

  React.useEffect(() => {
    setCopyValue({ value: link.to, copied: false })
  }, [link])

  if (loading) return <Loader />
  return (
    <Card className={classes.root}>
      <CardContent>
        {copyValue.copied ? <Alert text='Ссылка скопирована' success /> : ''}
        <Grid container direction='column'>
          <Grid item>
            <Typography className={classes.link} gutterBottom>
              <a href={link.to} target='_blank' _blank='true' rel='noreferrer'>
                {link.to}
              </a>
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.link} component='p' gutterBottom>
              <a
                // className={classes.link}
                // style={{ display: 'block' }}
                href={link.from}
                target='_blank'
                _blank='true'
                rel='noreferrer'>
                {link.from}
              </a>
            </Typography>
          </Grid>
          <Grid item>
            <Link to={`/app/detail/${link._id}`}>
              <Button
                size='small'
                endIcon={<MoreOutlinedIcon />}
                variant='outlined'
                color='primary'>
                Детали
              </Button>
            </Link>
            <CopyToClipboard text={copyValue.value} onCopy={copyHandler}>
              <IconButton color='primary'>
                <FileCopyIcon />
              </IconButton>
            </CopyToClipboard>
            <IconButton
              onClick={() => deleteHandler(link._id, link.to)}
              aria-label='delete'
              color='secondary'>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LinkCard

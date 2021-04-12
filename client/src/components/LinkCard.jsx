import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../components'
import { makeStyles } from '@material-ui/core/styles'
import { CardActions, Typography, Card, Button, CardContent } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { deleteLink } from '../redux/actions/linkActions'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
})

function LinkCard({ link }) {
  const { loading } = useSelector(({ linkReducer }) => linkReducer)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  function deleteHandler(id) {
    dispatch(deleteLink(id))
    history.push('/app/links')
  }
  if (loading) return <Loader />
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          Ссылка :
          <a href={link.from} target='_blank' _blank='true' rel='noreferrer'>
            {link.from}
          </a>
        </Typography>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          Сокрощенная ссылка:
          <a href={link.to} target='_blank' _blank='true' rel='noreferrer'>
            {link.to}
          </a>
        </Typography>

        <Typography variant='body2' component='p'>
          Дата создание : {link.date}
        </Typography>
        <Typography variant='body2' component='p'>
          Количество кликов : {link.clicks}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => deleteHandler(link._id)}
          variant='outlined'
          color='secondary'
          size='small'>
          Удалить
        </Button>
        {/* <Link to='/create'>
          <Button variant='outlined' color='primary' size='small'>
            Назад
          </Button>
        </Link> */}
      </CardActions>
    </Card>
  )
}

export default LinkCard

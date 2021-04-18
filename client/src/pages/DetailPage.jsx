import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, DetailCard, BarChartClicks } from '../components'
import { useSelector, useDispatch } from 'react-redux'

import { getOneLink } from '../redux/actions/linkActions'
import { Grid, Card, Typography, makeStyles } from '@material-ui/core'

const useSyles = makeStyles({
  flexItem: {
    flex: '0 1 50% ',
  },
})

function DetailPage() {
  const dispatch = useDispatch()
  const linkId = useParams().id
  const { loading, linkOne, error } = useSelector(({ linkReducer }) => linkReducer)
  const { link, browser, platform } = linkOne
  const classes = useSyles()

  useEffect(() => {
    dispatch(getOneLink(linkId))
  }, [dispatch, linkId])

  if (!link || loading) {
    if (error) return <Typography> Что то пошло не так </Typography>
    return <Loader />
  }

  return (
    <>
      <DetailCard link={link} />
      <br />
      <br />
      <br />
      {browser.length && platform.length ? (
        <Grid container justify='space-between' spacing={3} wrap='wrap'>
          <Grid item className={classes.flexItem}>
            <Typography gutterBottom>Система (Click) </Typography>
            <Card>
              <BarChartClicks data={browser} />
            </Card>
          </Grid>
          <Grid item className={classes.flexItem}>
            <Typography gutterBottom>Браузеры (Click)</Typography>
            <Card>
              <BarChartClicks data={platform} />
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography> Пока нет статистики </Typography>
      )}
    </>
  )
}

export default DetailPage

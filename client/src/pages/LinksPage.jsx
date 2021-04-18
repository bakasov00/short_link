import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LinksList, Loader } from '../components'

import { Typography } from '@material-ui/core'

import { getAllLinks } from '../redux/actions/linkActions'

function LinksPage() {
  const dispatch = useDispatch()
  const { allLinks, loading } = useSelector(({ linkReducer }) => linkReducer)

  useEffect(() => {
    try {
      dispatch(getAllLinks())
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])

  return (
    <>
      <Typography
        variant='h4'
        style={{
          marginBottom: '20px',
        }}>
        Ваши ссылки
      </Typography>
      {!loading ? <LinksList links={allLinks} /> : <Loader />}
    </>
  )
}

export default LinksPage

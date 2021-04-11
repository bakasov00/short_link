import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LinkCard, Loader } from '../components'
import { useSelector, useDispatch } from 'react-redux'

import { getOneLink } from '../redux/actions/linkActions'

function DetailPage() {
  const linkId = useParams().id
  const dispatch = useDispatch()
  const { loading, link } = useSelector(({ linkReducer }) => linkReducer)

  useEffect(() => {
    dispatch(getOneLink(linkId))
  }, [dispatch, linkId])

  return <>{!loading ? <LinkCard link={link} /> : <Loader />}</>
}

export default DetailPage

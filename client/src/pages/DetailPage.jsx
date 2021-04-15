import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LinkCard, Loader, DetailCard } from '../components'
import { useSelector, useDispatch } from 'react-redux'

import { getOneLink } from '../redux/actions/linkActions'
import Example from '../components/File'

function DetailPage() {
  const dispatch = useDispatch()
  const linkId = useParams().id
  const { loading, link } = useSelector(({ linkReducer }) => linkReducer)

  useEffect(() => {
    dispatch(getOneLink(linkId))
  }, [dispatch, linkId])

  if (loading) return <Loader />

  return (
    <>
      <DetailCard link={link} />
      <Example />
    </>
  )
}

export default DetailPage

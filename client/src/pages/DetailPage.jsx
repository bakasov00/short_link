import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LinkCard, Loader } from '../components'
import { useSelector, useDispatch } from 'react-redux'

import { getOneLink } from '../redux/actions/linkActions'

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
      <LinkCard link={link} />
    </>
  )
}

export default DetailPage

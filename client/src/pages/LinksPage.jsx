import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LinksList, Loader } from '../components'

import { getAllLinks } from '../redux/actions/linkActions'

function LinksPage() {
  const dispatch = useDispatch()
  const { links, loading } = useSelector(({ linkReducer }) => linkReducer)
  useEffect(() => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userData'))
      dispatch(getAllLinks(token))
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])

  return (
    <div>
      <h3>Ваши ссылки</h3>
      {!loading ? <LinksList links={links} /> : <Loader />}
    </div>
  )
}

export default LinksPage

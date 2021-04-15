import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CONSTANTS from '../redux/constants'
import { Alert, LinkCard, LinksList } from '../components'

import { generateLink } from '../redux/actions/linkActions'

function CreatePage() {
  const { loading, error, link } = useSelector(({ linkReducer }) => linkReducer)
  const dispatch = useDispatch()
  const [linkValue, setLinkValue] = useState('')

  const pressHandler = () => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(generateLink(linkValue.split(' ').join('')))
    setLinkValue('')
  }

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CONSTANTS.CLEAR_ERROR })
      }, 5000)
    }
  }, [dispatch, error])

  return (
    <>
      {error ? <Alert text={error} /> : ''}
      <br />
      <TextField
        autoComplete='on'
        name='link'
        type='text'
        value={linkValue}
        label='Введите ссылку'
        variant='outlined'
        fullWidth
        onChange={(e) => setLinkValue(e.target.value)}
      />
      <br />
      <br />
      <Button
        disabled={loading || !linkValue}
        onClick={pressHandler}
        variant='contained'
        color='primary'>
        Сократить
      </Button>
      <br />
      <br />
      {link.to ? <LinkCard link={link} /> : ''}
      <br />
      <br />

      <Link to='/app/links' style={{ fontSize: 24, fontWeight: 500, textAlign: 'center' }}>
        Все ссылки
      </Link>
    </>
  )
}

export default CreatePage

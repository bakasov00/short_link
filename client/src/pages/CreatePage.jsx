import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CONSTANTS from '../redux/constants'
import { Alert } from '../components'

import { generateLink } from '../redux/actions/linkActions'

function CreatePage() {
  const { loading, error } = useSelector(({ linkReducer }) => linkReducer)
  const dispatch = useDispatch()
  const [linkValue, setLinkValue] = useState('')

  const history = useHistory()

  const pressHandler = () => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(generateLink(linkValue.split(' ').join(''))).then((data) => {
      if (data) {
        history.push(`/app/detail/${data._id}`)
      }
    })
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
        autoComplete='off'
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
    </>
  )
}

export default CreatePage

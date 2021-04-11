import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { generateLink } from '../redux/actions/linkActions'

function CreatePage() {
  const { loading, link } = useSelector(({ linkReducer }) => linkReducer)
  const dispatch = useDispatch()
  const [linkValue, setLinkValue] = useState('')

  const history = useHistory()

  const pressHandler = () => {
    dispatch(generateLink(linkValue.split(' ').join('')))
    history.push(`/detail/${link._id}`)
  }

  return (
    <>
      <br />
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
      <br /> <br />
      <Button onClick={pressHandler} variant='contained' color='secondary'>
        Сократить
      </Button>
    </>
  )
}

export default CreatePage

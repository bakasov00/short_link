import React from 'react'

import { Button, Grid } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { generateNoAuthLink } from '../redux/actions/linkActions'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, LinkCardNoAuth } from '../components'
import CONSTANTS from '../redux/constants'

function MainPage() {
  const ref = React.useRef(null)
  const [input, setInput] = React.useState('')
  const { loading, error, linkNoAuth } = useSelector(({ linkReducer }) => linkReducer)

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = () => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(generateNoAuthLink(input)).then((data) => {
      if (data) {
        setInput(data.to)
      }
    })
  }

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CONSTANTS.CLEAR_ERROR })
      }, 4000)
    }
  }, [dispatch, error])

  return (
    <Grid>
      <ValidatorForm autoComplete='on' ref={ref} onSubmit={handleSubmit}>
        {error ? <Alert text={error} /> : ''}

        <TextValidator
          variant='outlined'
          label='Введите ссылку'
          fullWidth
          onChange={handleChange}
          name='link'
          value={input}
          validators={['required']}
          errorMessages={['Это поле обязательно']}
          // className={classes.input}
        />
        <br />
        <Button disabled={loading} type='submit' variant='outlined' color='primary'>
          {loading ? 'Загрузка...' : 'Сократить'}
        </Button>
      </ValidatorForm>
      <br />
      <br />
      {linkNoAuth && <LinkCardNoAuth links={linkNoAuth} />}
    </Grid>
  )
}

export default MainPage

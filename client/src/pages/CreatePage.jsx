import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  CardContent,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import CONSTANTS from '../redux/constants'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Alert, CopyClipboard, SimpleCard } from '../components'

import { useForm, Controller } from 'react-hook-form'

import { generateLink } from '../redux/actions/linkActions'

function CreatePage() {
  const { loading, error, linkOne } = useSelector(({ linkReducer }) => linkReducer)
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const dispatch = useDispatch()
  const [visiable, setVisiable] = React.useState(false)
  // const [linkValue, setLinkValue] = useState(' ')
  // const handleChange = (event) => {
  //   setLinkValue(event.target.value)
  // }

  const onSubmit = ({ link }) => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(generateLink(link.split(' ').join(''))).then((data) => {
      if (data) {
        setVisiable(true)
      } else {
        setVisiable(false)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {error ? <Alert text={error} /> : ''}
        <br />
        <Controller
          name='link'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Это поле не может быть пустым',
            },
            pattern: {
              value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
              message: 'Введите валидную ссылку',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              // onClick={() => console.log(field)}
              // onChange={handleChange}
              // value={linkValue}
              fullWidth
              helperText={errors.link ? errors.link.message : null}
              variant='outlined'
              label='Введите ссылку'
              error={!!errors.link}
            />
          )}
        />
        <br />
        <br />
        <Button disabled={loading} variant='outlined' color='primary' type='submit'>
          Сократить
        </Button>
      </form>
      <br />
      <br />
      {visiable && <SimpleCard link={linkOne} />}
      <br />
      <Link to='/app/links' style={{ fontSize: 24, fontWeight: 500, textAlign: 'center' }}>
        Все ссылки
      </Link>
    </>
  )
}

export default CreatePage

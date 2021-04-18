import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CONSTANTS from '../redux/constants'
import { signin } from '../redux/actions/userActions'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Alert } from '../components'

import { useForm, Controller } from 'react-hook-form'

import Toast, { useToast } from '../components/Toast/Toast'

const useStyles = makeStyles({
  div: {
    paddingTop: 60,
    maxWidth: 600,
    margin: '0 auto',
  },
  flexItem: {
    flexBasis: '100%',
  },
  input: {
    margin: '15px 0',
  },
  span: {
    textDecoration: 'underline',
    color: 'blue',
  },
})

function Signin() {
  const { loading, error } = useSelector(({ userReducer }) => userReducer)
  const dispatch = useDispatch()
  const classes = useStyles()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  // const [form, setForm] = React.useState({
  //   email: '',
  //   password: '',
  // })
  // const handleChange = (event, field) => {
  //   setForm({ ...form, [event.target.name]: event.target.value })
  // }
  const { toastShow, toastRemove, toasts } = useToast()

  const onSubmit = (data) => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(signin(data)).then((data) => {
      if (data.errMessage) {
        toastShow({ message: `${data.errMessage}`, flag: 'error' })
      }
    })
  }

  // React.useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       dispatch({ type: CONSTANTS.CLEAR_ERROR })
  //     }, 5000)
  //   }
  // }, [dispatch, error])

  // const handleClick = () => {

  // }
  return (
    <Grid container justify='center' className={classes.div}>
      <Toast toastRemove={toastRemove} toasts={toasts} />
      <Typography variant='h4'> Авторизация </Typography>
      <Grid item className={classes.flexItem}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Это поле не может быть пустым',
              },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Не коректный Email',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                label='Email'
                className={classes.input}
                fullWidth
                // onChange={handleChange}
                // value={form.email}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Это поле не может быть пустым',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                className={classes.input}
                label='Пароль'
                fullWidth
                // onChange={handleChange}
                // value={form.password}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Button disabled={loading} color='primary' variant='contained' type='submit'>
            {loading ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>

        <br />
        <Link to='/signup'>
          Нет аккаунта ? <span className={classes.span}>Регицтрация</span>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Signin

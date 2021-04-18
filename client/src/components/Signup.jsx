import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, TextField } from '@material-ui/core'
import { Alert } from '../components'
import CONSTANTS from '../redux/constants'

import { useForm, Controller } from 'react-hook-form'
import Toast, { useToast } from '../components/Toast/Toast'

import { signup } from '../redux/actions/userActions'

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

function Signup() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const { toastShow, toastRemove, toasts } = useToast()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const { loading, error, userData } = useSelector(({ userReducer }) => userReducer)
  // const [form, setForm] = React.useState({
  //   email: '',
  //   password: '',
  // })

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CONSTANTS.CLEAR_ERROR })
      }, 5000)
    }
  }, [dispatch, error])

  // const handleChange = (event) => {
  //   setForm({ ...form, [event.target.name]: event.target.value })
  // }

  const onSubmit = (data) => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(signup(data)).then((data) => {
      if (data.errMessage) {
        toastShow({ message: `${data.errMessage}`, flag: 'error' })
      } else {
        toastShow({ message: `${data.message}`, flag: 'success' })
      }
    })
    // history.push('/auth/signin')
  }

  return (
    <Grid container justify='center' className={classes.div}>
      <Toast toastRemove={toastRemove} toasts={toasts} />

      <Typography variant='h4'> Региcтрация </Typography>
      <Grid item className={classes.flexItem}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {error || userData.message ? (
            <Alert success={error ? false : true} text={error ? error : userData.message} />
          ) : (
            ''
          )} */}
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
            {loading ? 'Загрузка...' : 'Региcтрация'}
          </Button>
        </form>
        <br />
        <Link to='/signin'>
          Уже есть аккаунт? <span className={classes.span}>Войти</span>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Signup

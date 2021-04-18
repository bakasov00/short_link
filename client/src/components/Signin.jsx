import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import CONSTANTS from '../redux/constants'

import { signin } from '../redux/actions/userActions'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Alert } from '../components'

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
  const history = useHistory()

  const ref = React.useRef(null)
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(signin(form))
    // history.push('/auth/signin')
  }

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CONSTANTS.CLEAR_ERROR })
      }, 5000)
    }
  }, [dispatch, error])

  return (
    <Grid container className={classes.div}>
      <Grid item className={classes.flexItem}>
        <ValidatorForm autoComplete='on' ref={ref} onSubmit={handleSubmit}>
          <Typography variant='h4'>Авторизация </Typography>
          {error ? <Alert text={error} /> : ''}
          <TextValidator
            variant='outlined'
            label='Email'
            fullWidth
            onChange={handleChange}
            name='email'
            value={form.email}
            validators={['required', 'isEmail']}
            errorMessages={['Это поле обязательно', 'Не коректный email']}
            className={classes.input}
          />
          <TextValidator
            className={classes.input}
            variant='outlined'
            fullWidth
            label='Password'
            onChange={handleChange}
            name='password'
            value={form.password}
            validators={['required']}
            errorMessages={['Это поле обязательно']}
          />

          <Button disabled={loading} color='primary' variant='contained' type='submit'>
            {loading ? 'Загрузка...' : 'Войти'}
          </Button>
          <br />
          <Link to='/signup'>
            Нет аккаунта ? <span className={classes.span}>Регицтрация</span>
          </Link>
        </ValidatorForm>
      </Grid>
    </Grid>
  )
}

export default Signin

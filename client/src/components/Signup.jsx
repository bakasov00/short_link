import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Alert } from '../components'
import CONSTANTS from '../redux/constants'

import { signup } from '../redux/actions/userActions'

const useStyles = makeStyles({
  div: {
    paddingTop: 100,
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
  const ref = React.useRef(null)
  const classes = useStyles()

  const { loading, error, userData } = useSelector(({ userReducer }) => userReducer)
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CONSTANTS.CLEAR_ERROR })
      }, 5000)
    }
  }, [dispatch, error])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    dispatch({ type: CONSTANTS.CLEAR_ERROR })
    dispatch(signup(form))
  }

  return (
    <Grid container justify='center' className={classes.div}>
      <Grid item className={classes.flexItem}>
        <ValidatorForm autoComplete='on' ref={ref} onSubmit={handleSubmit}>
          <Typography variant='h4'>Регистрация</Typography>
          {error || userData.message ? (
            <Alert success={error ? false : true} text={error ? error : userData.message} />
          ) : (
            ''
          )}
          <TextValidator
            variant='outlined'
            label='Email'
            onChange={handleChange}
            name='email'
            fullWidth
            value={form.email}
            validators={['required', 'isEmail']}
            errorMessages={['Это поле обязательно', 'Не коректный email']}
            className={classes.input}
          />
          <TextValidator
            variant='outlined'
            label='Password'
            onChange={handleChange}
            name='password'
            fullWidth
            value={form.password}
            validators={['required']}
            errorMessages={['Это поле обязательно']}
            className={classes.input}
          />
          <Button disabled={loading} color='primary' variant='contained' type='submit'>
            {loading ? 'Загрузка...' : 'Региcтрация'}
          </Button>
          <br />
          <Link to='/auth/signin'>
            Уже есть аккаунт? <span className={classes.span}>Войти</span>
          </Link>
        </ValidatorForm>
      </Grid>
    </Grid>
  )
}

export default Signup

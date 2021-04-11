import React from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { signin } from '../redux/actions/userActions'

function Signin() {
  const dispatch = useDispatch()
  const ref = React.useRef(null)
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async () => {
    dispatch(signin(form))
  }

  return (
    <ValidatorForm autoComplete='on' ref={ref} onSubmit={handleSubmit}>
      <h2>Авторизация </h2>
      <TextValidator
        variant='outlined'
        label='Email'
        onChange={handleChange}
        name='email'
        value={form.email}
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
      />
      <br />
      <TextValidator
        variant='outlined'
        label='Password'
        onChange={handleChange}
        name='password'
        value={form.password}
        validators={['required']}
        errorMessages={['this field is required']}
      />
      <br />
      <Button color='primary' variant='contained' type='submit'>
        Войти
        {/* {(form.submitted && 'Your form is submitted!') || (!form.submitted && 'Submit')} */}
      </Button>
      <Link to='/signup'>Регицтрация</Link>
    </ValidatorForm>
  )
}

export default Signin

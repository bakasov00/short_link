import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'
import CONSTANTS from '../redux/constants'

function Navbar() {
  const history = useHistory()
  const dispatch = useDispatch()

  function logoutHandler() {
    localStorage.removeItem('userData')
    dispatch({ type: CONSTANTS.LOGOUT })
    history.push('/')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          <NavLink to='/create'>Link Shortening</NavLink>
        </Typography>
        <NavLink to='/create'>Создать</NavLink>
        <NavLink to='/links'>Ссылки</NavLink>
        <Button color='inherit' onClick={logoutHandler}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

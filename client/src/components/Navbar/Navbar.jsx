import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CONSTANTS from '../../redux/constants'

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
  nav: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navBar: {
    marginBottom: '40px',
  },
  link: {
    color: `white`,
  },
  title: {
    color: `white`,
    flexGrow: 1,
  },
})

function Navbar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isAuth } = useSelector(({ userReducer }) => userReducer)
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')

  function logoutHandler() {
    localStorage.removeItem('ls_token')
    dispatch({ type: CONSTANTS.LOGOUT })
    history.push('/')
  }

  const navLink = [
    { title: isAuth ? 'Создать' : 'Войти', path: isAuth ? '/app/create' : '/signin' },
    { title: isAuth ? 'Ссылки' : 'Регистрация', path: isAuth ? '/app/links' : '/signup' },
  ]

  return (
    <AppBar position='static' className={classes.navBar}>
      <Toolbar>
        <NavLink to={isAuth ? '/app/create' : '/'} className={classes.title}>
          <Typography variant='h6' className={classes.link}>
            lshort
          </Typography>
        </NavLink>
        <List component='nav' className={classes.nav}>
          {navLink.map(({ title, path }) => (
            <NavLink to={path} key={title + path} className={classes.link}>
              <ListItem button>
                <ListItemText primary={title} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        {isAuth ? (
          <Button color='secondary' variant='contained' onClick={logoutHandler}>
            Выйти
          </Button>
        ) : (
          ''
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

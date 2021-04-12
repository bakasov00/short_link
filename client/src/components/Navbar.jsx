import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CONSTANTS from '../redux/constants'

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
  const classes = useStyles()

  function logoutHandler() {
    localStorage.removeItem('userData')
    dispatch({ type: CONSTANTS.LOGOUT })
    history.push('/auth/signin')
  }
  const navLink = [
    { title: 'Создать', path: '/app/create' },
    { title: 'Ссылки', path: '/app/links' },
  ]

  return (
    <AppBar position='static' className={classes.navBar}>
      <Toolbar>
        <NavLink to='/app/create' className={classes.title}>
          <Typography variant='h6' className={classes.link}>
            Link Shortener
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
        <Button color='secondary' variant='contained' onClick={logoutHandler}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

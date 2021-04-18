import React from 'react'

import { Navbar } from './components'
import { getData } from './redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { useRoute } from './routes'

function App() {
  const { isAuth, loading } = useSelector(({ userReducer }) => userReducer)
  const dispatch = useDispatch()
  const route = useRoute(isAuth, loading)

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('ls_token'))
    if (token) {
      dispatch(getData(token))
    }
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Container>{route}</Container>
    </>
  )
}

export default App

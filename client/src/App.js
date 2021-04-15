import React from 'react'

import { Navbar } from './components'
import { getData } from './redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { useRoute } from './routes'

function App() {
  const { isAuth } = useSelector(({ userReducer }) => userReducer)
  const dispatch = useDispatch()
  const route = useRoute(isAuth)

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if (data && data.token) {
      dispatch(getData(data.token))
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

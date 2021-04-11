import { Switch, Route, Redirect } from 'react-router-dom'
import { CreatePage, DetailPage, LinksPage } from './pages'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { Navbar, Loader, Signin, Signup } from './components'
import { getData } from './redux/actions/userActions'
import { useDispatch } from 'react-redux'

function App() {
  const { isAuth, loading } = useSelector(({ userReducer }) => userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if (data && data.token) {
      dispatch(getData(data.token))
    }
  }, [dispatch])

  if (loading) {
    return <Loader />
  }
  return (
    <>
      {isAuth && <Navbar />}
      <div className='container'>
        {isAuth ? (
          <Switch>
            <Route path='/create' exact component={CreatePage} />
            <Route path='/links' exact component={LinksPage} />
            <Route path='/detail/:id' component={DetailPage} />
            <Redirect to='/create' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/signin' exact component={Signin} />
            <Route path='/signup' exact component={Signup} />
            <Redirect to='/signin' />
          </Switch>
        )}
      </div>
    </>
  )
}

export default App

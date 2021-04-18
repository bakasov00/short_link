import { Redirect, Route, Switch } from 'react-router-dom'
import { CreatePage, DetailPage, LinksPage, MainPage } from './pages'
import { Signin, Signup } from './components'

export const useRoute = (isAuth) => {
  if (localStorage.getItem('ls_token')) {
    return (
      <Switch>
        <Route path='/app/create' exact component={CreatePage} />
        <Route path='/app/links' exact component={LinksPage} />
        <Route path='/app/detail/:id' component={DetailPage} />
        <Redirect to='/app/create' />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/' component={MainPage} exact />
      <Route path='/signin' component={Signin} exact />
      <Route path='/signup' component={Signup} exact />
      <Redirect to='/signin' />
    </Switch>
  )
}

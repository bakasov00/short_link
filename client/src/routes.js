import { Redirect, Route, Switch } from 'react-router-dom'
import { CreatePage, DetailPage, LinksPage } from './pages'
import { Signin, Signup } from './components'

export const useRoute = (isAuth) => {
  if (isAuth) {
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
      <Route path='/auth/signin' component={Signin} />
      <Route path='/auth/signup' component={Signup} />
      {/* <Redirect to='/auth/signin' /> */}
    </Switch>
  )
}

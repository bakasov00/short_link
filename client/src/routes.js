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
        <Redirect to='/app/create' exact />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/auth/signin' component={Signin} exact />
      <Route path='/auth/signup' component={Signup} exact />
      {/* <Route component={NotFound} path='*' /> */}
    </Switch>
  )
}

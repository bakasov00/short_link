import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
// import { CssBaseline } from '@material-ui/core'
// import { AuthContext } from './context/AuthContext'

import App from './App'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* <AuthContext.Provider value={} > */}
        {/* <CssBaseline /> */}
        <App />
        {/* </AuthContext.Provider> */}
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

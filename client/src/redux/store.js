import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import linkReducer from './reducers/linkReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  userReducer,
  linkReducer,
})

// const saveState = ({ linkReducer }) => {
//   linkReducer.loading = false
//   localStorage.setItem('link_state', JSON.stringify(linkReducer))
// }

// const linkLoadState = () => {
//   const serialisedState = JSON.parse(localStorage.getItem('link_state'))
//   if (serialisedState) return serialisedState
// }

// const linkOldState = linkLoadState()

const store = createStore(
  rootReducer,
  // { linkReducer: linkOldState },
  composeEnhancers(applyMiddleware(thunk)),
)

// store.subscribe(() => {
//   saveState(store.getState())
// })

export default store

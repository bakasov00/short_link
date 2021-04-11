import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import linkReducer from './reducers/linkReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  userReducer,
  linkReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store

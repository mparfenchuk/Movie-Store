import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

export const history = createBrowserHistory()

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(history)

const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware
    )
  )
)

export default store
import { combineReducers } from 'redux'
import moviesReducer from './reducers/movies'

const reducer = combineReducers({
  movies: moviesReducer
})

export default reducer
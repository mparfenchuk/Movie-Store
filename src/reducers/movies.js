import * as constants from '../constants';

const initialState = {  
  movies:[]
}
  
const moviesReducer = (state = initialState, action) => {
    if (action.type === constants.SET_POPULAR)
    {
      return Object.assign({}, state, {   
        movies: action.payload
      })
    }

    if (action.type === constants.SET_LATEST)
    {
      return Object.assign({}, state, {   
        movies: action.payload
      })
    }
  
    return state
  }
  
export default moviesReducer
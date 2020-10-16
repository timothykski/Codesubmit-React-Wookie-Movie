import ActionTypes from './types'

const initialState = {
  loading: false,
  total: 0,
  data: []
}

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.API_ATTEMPT:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.API_FAILURE:
      return {
        ...state,
        loading: false
      }

    case ActionTypes.GET_MOVIES_SUCCESS:
      return {
        ...action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default moviesReducer

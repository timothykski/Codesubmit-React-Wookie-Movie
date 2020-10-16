import ActionTypes from './types'
import * as API from 'core/api'
import { errorHandler } from 'core/helpers'

export const apiAttempt = () => ({ type: ActionTypes.API_ATTEMPT })
export const apiFailure = () => ({ type: ActionTypes.API_FAILURE })
export const getMoviesSuccess = payload => ({ type: ActionTypes.GET_MOVIES_SUCCESS, payload })

export const getMovies = params => async dispatch => {
  try {
    dispatch(apiAttempt())

    const { ok, data } = await API.getMovies(params)
    if (!ok) {
      throw data
    }

    dispatch(getMoviesSuccess({
      data: data.movies,
      total: data.movies.length
    }))
  } catch (e) {
    dispatch(apiFailure())
    errorHandler(e)
  }
}

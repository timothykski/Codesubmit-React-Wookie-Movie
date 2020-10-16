import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import coreReducer from './store/reducers'
import moviesReducer from 'movies/store/reducers'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const moviesPersistConfig = {
  key: 'movies',
  storage,
  blacklist: ['loading']
}

export const createRootReducer = history =>
  persistReducer(
    rootPersistConfig,
    combineReducers({
      core: coreReducer,
      movies: persistReducer(moviesPersistConfig, moviesReducer),
      toastr: toastrReducer,
      form: formReducer,
      router: connectRouter(history)
    })
  )

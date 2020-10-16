import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'

import NotFoundPage from './containers/NotFoundPage'
import BadPermPage from './containers/BadPermPage'
import MoviesPage from 'movies/containers/MoviesPage'
import MovieDetail from 'movies/containers/MovieDetail'

const Routes = () => (
  <>
    <Switch>
      <Redirect exact from='/' to='movies' />
      <Route path='/movies' component={MoviesPage} />
      <Route path='/movie/:slug' component={MovieDetail} />
      <Route path='/forbidden' component={BadPermPage} />
      <Route path='*' component={NotFoundPage} />
    </Switch>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position='top-right'
      transitionIn='fadeIn'
      transitionOut='fadeOut'
    />
  </>
)

export default Routes

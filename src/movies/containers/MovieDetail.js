import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, Grid, Button, CircularProgress } from '@material-ui/core'
import Moment from 'moment'
import { Header } from 'core/components'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    height: '100vh',
    fontSize: 20
  },
  detail: {
    color: '#fff',
    maxWidth: 1240,
    width: '100%',
    paddingTop: '10em',
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '2em'
  },
  overview: {
    marginTop: '2.5em'
  }
}));

const MovieDetail = (props) => {

  const classes = useStyles()
  const [ movie, setMovie ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    props.data.forEach(movie => {
      if (movie.slug === props.match.params.slug) {
        setMovie(movie)
        setLoading(false)
      }
    })
    setLoading(false)
    return () => {}
  }, [props.data, props.match.params])

  return (
    <div>
      <Header />
      {
        loading && <div className="flex justify-center items-center" style={{height: '80vh'}}>
          <CircularProgress />
        </div>
      }
      {
        !loading && 
        <div className={classes.root} style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 100%), url(${movie.backdrop})` }}>
          <Grid container spacing={3} className={classes.detail}>
            <Grid item xs={4}>
              <img src={movie.poster} alt={movie.title} />
            </Grid>
            <Grid item xs={8}>
              <p className={classes.title}>{movie.title}</p>
              <p>Rating: {movie.imdb_rating}</p>
              <p>Release: {Moment(movie.released_on).format('DD-MM-YYYY')}</p>
              <p>Classification: {movie.classification}</p>
              <p>Cast: {movie.cast.map((cast, i) => {
                if (i) { return `, ${cast}` }
                return cast
              })}</p>
              <p className={classes.overview}>{movie.overview}</p>
            </Grid>
          </Grid>
          <div className="flex justify-center mt-40">
            <Link to="/movies">
              <Button variant="contained" color="primary">Return</Button>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = ({ movies: { data } }) => ({
  data,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)

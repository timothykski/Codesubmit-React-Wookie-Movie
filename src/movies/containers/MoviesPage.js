import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, CircularProgress, Divider } from '@material-ui/core'
import { Header } from 'core/components'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 35,
    marginBottom: 20
  },
  card: {
    margin: 10
  },
}));

const MoviesPage = ({ data, loading }) => {

  const classes = useStyles()
  const filterByGenre = () => {
    let moviesByGenre = {};
    data.forEach(movie => {
      movie.genres.forEach(genre => {
        if (typeof moviesByGenre[genre] === 'undefined') {
          moviesByGenre[genre] = []
        }
        moviesByGenre[genre].push(movie)
      })
    });

    return (
      <div>
        {
          Object.keys(moviesByGenre).map((genre) =>
            <div key={genre}>
              <h3 className={classes.title}>{genre}</h3>
              <div className={classes.root}>
                <Grid container spacing={3}>
                {
                  moviesByGenre[genre].map((movie) =>
                    <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                      <Card className={classes.card}>
                        <CardMedia
                          component="img"
                          alt={movie.title}
                          image={movie.poster}
                          title={movie.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {movie.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {movie.overview}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link to={`/movie/${movie.slug}`}>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                }
                </Grid>
              </div>
              <Divider className="mt-20 mb-40" />
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center p-40 pt-60'>
        {
          loading && <div className="flex justify-center items-center" style={{height: '80vh'}}>
            <CircularProgress />
          </div>
        }
        {
          !loading && filterByGenre()
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ movies: { data, loading, total } }) => ({
  data,
  loading,
  total
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage)

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Movies extends Component {
 
  render() {

    let {movies, type} = this.props

    return (
    <div className="container">
        {movies.map((moviesRow, rowIndex) => {
          return (<div className="row" key={rowIndex}>
            {moviesRow.map((movie, index) => 
              <div className={type === 'search'? 'col-md-6' : 'col-md-3'} key={index}>
                <Link to={"/movie-store/movie/"+movie.id} className="card mb-4 box-shadow movie" target={type === 'search'? '_blank' : null}>
                    {type === 'search'? null : <img className="card-img-top" src={movie.poster !== null ? 'https://image.tmdb.org/t/p/w500'+movie.poster : 'https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg'} alt={movie.title}/>}
                    <div className="card-body">
                        <h5 className="card-title">{movie.title+' '}</h5>
                        {movie.genres.map((genre, index)=>
                          <span className="badge badge-dark mr-2" key={index}>{genre}</span>
                        )}
                        <div className="mt-2">
                          <small className="text-muted">Rating:</small>
                          <div className={type === 'search'? 'progress col-6 pl-0 pr-0' : 'progress'}>
                            <div className={(movie.rating > 8) ? "progress-bar bg-success": (movie.rating < 6) ? "progress-bar bg-danger": "progress-bar bg-info"} role="progressbar" style={{width:movie.rating*10+'%'}} aria-valuenow={movie.rating} aria-valuemin="0" aria-valuemax="100">{movie.rating}%</div>
                          </div>
                        </div>
                    </div>
                </Link>
              </div>
            )}
          </div>);
        })}
      </div>
    );
  }
}

export default Movies;
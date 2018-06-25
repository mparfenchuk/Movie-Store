import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Icon from 'react-feather';
import Popular from './components/Popular';
import Latest from './components/Latest';
import Watchlist from './components/Watchlist';

import './App.css';

class App extends Component {
 
  constructor(props) {
    super(props)

    this.state = {
      navActive: 'LATEST',
      searchResult: [],
      searchInput: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {

    let {navActive} = this.state;
    let {movies, watchlistMovies} = this.props;

    if (navActive === 'WATCHLIST'){

      if (watchlistMovies.length > 0){

        let result = [];

        watchlistMovies.map((movie, index) => {
          return movie.title.toLowerCase().includes(event.target.value.toLowerCase()) ? result.push(movie) : null;
        }).filter(movie => movie != null);

        let searchResult = result.map((movie, index) => {
          return index % 2 === 0 ? result.slice(index, index + 2) : null;
        }).filter(movie => movie != null);

        if(event.target.value !== ""){

          this.setState({ 
            searchInput: event.target.value,
            searchResult: searchResult
          });
        } else {

          this.setState({ 
            searchInput: "",
            searchResult: []
          });
        }
      }
    } else {

      if (movies.length > 0){

        let result = [];

        movies.map((movieRow, index) => {
          return movieRow.map((movie, index)=>{
            return movie.title.toLowerCase().includes(event.target.value.toLowerCase()) ? result.push(movie) : null;
          }).filter(movie => movie != null);
        }).filter(movieRow => movieRow != null);

        let searchResult = result.map((movie, index) => {
          return index % 2 === 0 ? result.slice(index, index + 2) : null;
        }).filter(movie => movie != null);

        if(event.target.value !== ""){

          this.setState({ 
            searchInput: event.target.value,
            searchResult: searchResult
          });
        } else {

          this.setState({ 
            searchInput: "",
            searchResult: []
          });
        }  
      }
    }
  }

  render() {

    let {navActive, searchResult} = this.state;

    const Movies = ({movies}) => (
      <div className="container">
        {movies.map((moviesRow, rowIndex) => {
          return (<div className="row" key={rowIndex}>
            {moviesRow.map((movie, index) => 
              <div className="col-md-6" key={index}>
                <div className="card mb-4 box-shadow">
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        {movie.genres.map((genre, index)=>
                          <span className="badge badge-dark mr-2" key={index}>{genre}</span>
                        )}
                        <div className="mt-2">
                          <small className="text-muted">Rating:</small>
                          <div className="progress col-6 pl-0 pr-0">
                            <div className={(movie.rating > 8) ? "progress-bar bg-success": (movie.rating < 6) ? "progress-bar bg-danger": "progress-bar bg-info"} role="progressbar" style={{width:movie.rating*10+'%'}} aria-valuenow={movie.rating} aria-valuemin="0" aria-valuemax="100">{movie.rating}%</div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>);
        })}
      </div>
    ); 

    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0" >Movie Store</div>
          <input className="form-control form-control-dark w-100"  onChange={this.onInputChange}
          value={this.state.searchInput} type="text" placeholder="Search" aria-label="Search"/>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className={(navActive === 'LATEST') ? "nav-link active" : "nav-link"} onClick={(e) => {this.setState({ navActive: 'LATEST', searchInput: "", searchResult: [] }); window.scrollTo(0, 0);}}>
                      <Icon.Clock className="feather"/><br/>
                      LATEST {(navActive === 'LATEST') ? <span className="sr-only">(current)</span> : ""}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={(navActive === 'POPULAR') ? "nav-link active" : "nav-link"} onClick={(e) => {this.setState({ navActive: 'POPULAR', searchInput: "", searchResult: [] }); window.scrollTo(0, 0);}}>
                      <Icon.Star className="feather"/><br/>
                      POPULAR {(navActive === 'POPULAR') ? <span className="sr-only">(current)</span> : ""}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={(navActive === 'WATCHLIST') ? "nav-link active" : "nav-link"} onClick={(e) => {this.setState({ navActive: 'WATCHLIST', searchInput: "", searchResult: [] }); window.scrollTo(0, 0);}}>
                      <Icon.Menu className="feather"/><br/>
                      WATCHLIST {(navActive === 'WATCHLIST') ? <span className="sr-only">(current)</span> : ""}
                    </a>
                  </li>
                </ul> 
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">

              <Movies movies={searchResult}/>

              {(navActive === 'LATEST') ? <Latest/> : ""}
              {(navActive === 'POPULAR') ? <Popular/> : ""}
              {(navActive === 'WATCHLIST') ? <Watchlist/> : ""}
  
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies:state.movies.movies,
    watchlistMovies:state.movies.watchlistMovies
  }
}

export default connect(mapStateToProps)(App);


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
  "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", 
  "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
];

function Home() {
  const [query, setQuery] = useState(localStorage.getItem('savedQuery') || '');
  const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem('savedGenre') || '');
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(localStorage.getItem('savedTotalResults') || 0);
  const [loading, setLoading] = useState(false);

  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const searchMovies = async (e, pageno = 1) => {
    try {
      setLoading(true); 

      if (e) {
        e.preventDefault();
      }

      const response = await axios.get(`${REACT_APP_SERVER_URL}api/movies`, {
        params: { title: query, genre: selectedGenre, page: pageno },
      });
      setMovies(response.data.movies);
      setTotalResults(response.data.totalResults);

      localStorage.setItem('savedMovies', JSON.stringify(response.data.movies));
      localStorage.setItem('savedTotalResults', response.data.totalResults);
      localStorage.setItem('savedQuery', query);
      localStorage.setItem('savedGenre', selectedGenre);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      searchMovies();
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    searchMovies(null, pageNumber);
  };
  
  return (
    <div className="movie-explorer-container bg-dark text-light min-vh-100 p-5">
      <h1 className="display-1 mb-5 d-flex justify-content-center text-center">Movie Explorer</h1>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <form onSubmit={(e) => searchMovies(e)} className="mb-3 row" style={{ width: "80%" }}>
          <div className="col mb-4">
            <div className="input-group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title..."
                className="form-control"
                style={{ width: "60%" }}
              />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="form-select"
                style={{ maxWidth: "18%" }}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center view-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {movies.length > 0 ? (
            <div className="d-flex flex-column">
              <div className="row flex-grow-1 justify-content-center">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                  {movies.map((movie) => (
                    <div key={movie.imdbID} className="col mb-4">
                      <div className="card h-100 d-flex flex-column bg-secondary text-light border-light shadow">
                        <Link to={`/movie/${movie.imdbID}`} className="d-flex flex-grow-1">
                          <img
                            src={movie.Poster || "/no-image-available.webp"}
                            alt={movie.Title}
                            className="card-img-top"
                            style={{ objectFit: "cover" }}
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {movie.Title} ({movie.Year})
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    <li className="page-item disabled">
                      <span className="page-link">
                        Page {currentPage} of {Math.ceil(totalResults / 10)}
                      </span>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage * 10 >= totalResults ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage * 10 >= totalResults}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <p>No movies found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Home;

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const SERVER_URL = process.env.SERVER_URL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const renderDetail = useMemo(() => (label, value) => {
    if (value !== 'N/A') {
      return (
        <p className="mb-2">
          <strong className="text-warning">{label}:</strong> {value}
        </p>
      );
    }
    return null;
  }, []);

  if (!movie) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4 bg-dark text-light p-5 rounded shadow-lg" style={{minHeight: "80%"}}>
      <h1 className="display-1 mb-4 d-flex justify-content-center text-center" style={{color: "#e50914"}}>{movie.Title} ({movie.Year})</h1>
      <hr className="bg-light mb-5" />
      <div className="row">
        <div className="col-md-4 mb-4">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-8">
          <p className="mb-4">{movie.Plot}</p>
          {movie && (
            <>
              {renderDetail('Genre', movie.Genre)}
              {renderDetail('Director', movie.Director)}
              {renderDetail('Writer', movie.Writer)}
              {renderDetail('Actors', movie.Actors)}
              {renderDetail('Runtime', movie.Runtime)}
              {renderDetail('Awards', movie.Awards)}
              <p className="mb-2">
                <strong className="text-warning">Ratings:</strong>
              </p>
              {movie.Ratings.length !== 0 && 
              (<ul className="list-unstyled px-5 ms-4">
                {movie.Ratings.map((rating, index) => (
                  <li key={index} className="mb-1 d-grid gap-2">
                    <div>
                      <span className="text-warning">{rating.Source}:</span>{' '}
                      <span>{rating.Value}</span>
                    </div>
                  </li>
                ))}
              </ul>
              )}
              {renderDetail('Metascore', movie.Metascore)}
              {movie.Ratings.length > 0 && renderDetail('IMDB Rating', movie.imdbRating)}
              {renderDetail('IMDB Votes', movie.imdbVotes)}
              {renderDetail('BoxOffice', movie.BoxOffice)}
              {movie.Website !== 'N/A' && (
                <p className="mb-2">
                  <strong className="text-warning">Website:</strong>{' '}
                  <a
                    href={movie.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info"
                  >
                    {movie.Website}
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

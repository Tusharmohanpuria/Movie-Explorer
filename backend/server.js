const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'bcd4b452';
const BASE_URL = 'http://www.omdbapi.com/';
const MOVIES_PER_PAGE = 10;

app.get('/api/movies', async (req, res) => {
    const { title, genre, page } = req.query;
    let currentPage = page || 1;
    let movies = [];
    let totalResults = 0;
    
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                s: title || '',
                type: 'movie',
                page: currentPage,
            },
        });

        movies = response.data.Search || [];
        totalResults = response.data.totalResults || 0;

        if (genre) {
            movies = await Promise.all(movies.map(async (movie) => {
                const details = await axios.get(BASE_URL, {
                    params: {
                        apikey: API_KEY,
                        i: movie.imdbID,
                    },
                });
                return details.data;
            }));
            movies = movies.filter(movie => movie.Genre && movie.Genre.includes(genre));
        }

        while (movies.length < MOVIES_PER_PAGE && movies.length < totalResults) {
            currentPage++;
            const nextPageResponse = await axios.get(BASE_URL, {
                params: {
                    apikey: API_KEY,
                    s: title || '',
                    type: 'movie',
                    page: currentPage,
                },
            });

            const nextPageMovies = nextPageResponse.data.Search || [];
            
            if (genre) {
                const filteredNextPageMovies = await Promise.all(nextPageMovies.map(async (movie) => {
                    const details = await axios.get(BASE_URL, {
                        params: {
                            apikey: API_KEY,
                            i: movie.imdbID,
                        },
                    });
                    return details.data;
                }));
                
                movies = movies.concat(filteredNextPageMovies.filter(movie => 
                    movie.Genre && movie.Genre.includes(genre) && !movies.find(m => m.imdbID === movie.imdbID)
                ));
            } else {
                movies = movies.concat(nextPageMovies.filter(movie => !movies.find(m => m.imdbID === movie.imdbID)));
            }
        }

        movies = movies.slice(0, MOVIES_PER_PAGE);

        res.json({ movies, totalResults });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                i: id,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

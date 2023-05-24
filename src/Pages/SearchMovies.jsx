import React, { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

export const SearchMovies = () => {
  const API_URL = 'https://www.omdbapi.com?apikey=5c0c7bf';
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    searchMovies('');
  }, []);

  return (
    <div className="search-movies-container">
      <div className="lol">
        <div className='search'>
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress} // Added event listener for key press
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={handleSearch} // Changed the click event to call handleSearch function
          />
        </div>
        {movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2></h2>
          </div>
        )}
      </div>
      <Link to="/login" className="log-out">
        Logout
      </Link>
    </div>
  );
};

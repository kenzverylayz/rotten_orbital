import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';



export const SearchMovies = () => {
  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=f4911da5972e09e3264c1bbb0170d4ff")
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  const handleGenreSelection = (genreId) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f4911da5972e09e3264c1bbb0170d4ff&with_genres=${genreId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };


  return (
    <div className='movies'>
      <Navbar bg="black" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="nabarScroll">
            <Nav className="me-auto my-2 my-lg-3" navbarScroll>
              <Nav.Link onClick={() => handleGenreSelection(16)} style={{ fontSize: '30px' }}>For Kids</Nav.Link>
              <Nav.Link onClick={() => handleGenreSelection(28)} style={{ fontSize: '30px' }}>Action</Nav.Link>
              <Nav.Link onClick={() => handleGenreSelection(10749)} style={{ fontSize: '30px' }}>Romance</Nav.Link>
              <Nav.Link onClick={() => handleGenreSelection(35)} style={{ fontSize: '30px' }}>Comedy</Nav.Link>
              <Nav.Link onClick={() => handleGenreSelection(53)} style={{ fontSize: '30px' }}>Thriller</Nav.Link>
              <Nav.Link onClick={() => handleGenreSelection(27)} style={{ fontSize: '30px' }}>Horror</Nav.Link>
            </Nav>

            <Nav className="log-out">
              <Nav.Link href="/login" style={{ fontSize: '20px', marginTop: '-15px', color: 'white' }}>Logout</Nav.Link>
            </Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              />
              <Button variant="secondary" type="submit" disabled={!query.trim()}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="all-movies">
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => <MovieCard key={movieReq.id} {...movieReq} />)}
            </div>
          </div>
        ) : (
          <h2>Sorry !! No Movies Found</h2>
        )}
      </div>
    </div>
  );
};
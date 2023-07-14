import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ title, poster_path, vote_average, release_date, overview, id }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="card text-center bg-secondary mb-3 container" style={{ maxWidth: '18rem' }}>
      <img className="card-img-top img-fluid" src={API_IMG + poster_path} alt="Movie Poster" />
      <div className="card-body">
        <div className="button-container">
          <button type="button" className="btn btn-dark btn-block" onClick={handleShow}>View More</button>
          <Link to={`/commentsection?title=${title}&poster=${poster_path}&vote=${vote_average}&release=${release_date}&overview=${overview}&id=${id}`}>
            <button className="btn btn-dark btn-block">Review Section</button>
          </Link>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="card-img-top img-fluid" style={{ width: '100%' }} src={API_IMG + poster_path} alt="Movie Poster" />
          <h3>{title}</h3>
          <h4>IMDb: {vote_average}</h4>
          <h5>Release Date: {release_date}</h5>
          <br />
          <h6>Overview</h6>
          <p>{overview}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MovieCard;

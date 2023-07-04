import React, { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import { getAuth } from "firebase/auth";
import StarRating from './StarRating';

const MAX_WORDS = 500; // Maximum Number of Words Allowed

const CommentCard = ({ comment, handleDelete, handleUpdate }) => {
  const { Comment, movieid, time, username, rating, userID, Email } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(Comment);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const currentUser = getAuth().currentUser;
  const currentUserId = currentUser ? currentUser.uid : null;
  const userEmail = currentUser ? currentUser.email : null;

  const publishDate = time ? new Date(time.toMillis()).toLocaleString() : '';

  const handleInputChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const handleEditClick = () => {
    if (userID !== currentUserId) {
      setErrorMessage("Cannot Edit a Comment not made by you");
      return;
    }
    setIsEditing(!isEditing);
    setErrorMessage('');
  };

  const handleUpdateClick = () => {
    if (updatedComment.trim() === '') {
      setErrorMessage('Cannot save an empty comment');
      return;
    }
 
    if (updatedComment.trim().split(' ').length > MAX_WORDS) {
      setErrorMessage('Exceeded Word Limit: 500');
      return;
    }
 
    handleUpdate(updatedComment, selectedRating);
    setErrorMessage('');
    setIsEditing(false);
    setSelectedRating(null);
  };

  const handleDeleteClick = () => {
    if (userID !== currentUserId) {
      setErrorMessage("Cannot delete a comment not made by you");
      return;
    }

    handleDelete();
  };


  const starElements = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className="star"
      color={index < rating ? "#ffc107" : "#e4e5e9"}
      size={16}
    />
  ));

    
  return (
    <div className="comment-card">
      <div className="comment-card-header">
        <span className="username">{Email}
          <span className="rating-stars">{starElements}</span>
        </span>
        <span className="publish-date">posted on {publishDate}</span>
      </div>
      <div className="comment-card-content">
        {isEditing ? (
          <div>
            <p className="star-rating-inline"> <StarRating onSelectRating={setSelectedRating}/> </p>
            <textarea
              className="comment-textarea"
              value={updatedComment}
              onChange={handleInputChange}
              style={{ width: '80%', height: '100px' }} // Adjust the width and height values as needed
            />
          </div>
        ) : (
          <div>{Comment}</div>
        )}
      </div>
      <div className="comment-card-buttons">
        <button onClick={handleDeleteClick}>Delete</button>
        <button onClick={handleEditClick}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && <button onClick={handleUpdateClick}>Save</button>}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CommentCard;

import React, { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import deleteIcon from './delete.icon.svg';
import editIcon from './edit.icon.svg';

const MAX_WORDS = 500; // Maximum Number of Words Allowed

const CommentCard = ({ comment, handleDelete, handleUpdate }) => {
  const { Comment, movieid, time, username, rating } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(Comment);
  const [errorMessage, setErrorMessage] = useState('');

  const publishDate = time ? new Date(time.toMillis()).toLocaleString() : '';

  const handleInputChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const handleEditClick = () => {
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
 
    handleUpdate(updatedComment);
    setErrorMessage('');
    setIsEditing(false);
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
        <span className="username">{username}
          <span className="rating-stars">{starElements}</span>
        </span>
        <span className="publish-date">posted on {publishDate}</span>
      </div>
      <div className="comment-card-content">
        {isEditing ? (
          <textarea
            className="comment-textarea"
            value={updatedComment}
            onChange={handleInputChange}
            style={{ width: '80%', height: '100px' }} // Adjust the width and height values as needed
          />
        ) : (
          <div>{Comment}</div>
        )}
      </div>
      <div className="comment-card-buttons">
        <button onClick={handleDelete}>Delete</button>
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

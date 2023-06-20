import React from 'react';
import deleteIcon from './delete.icon.svg';
import editIcon from './edit.icon.svg';
import '../App.css';

const CommentCard = ({ comment, deleteComment, updateComment }) => {
  const { Comment, movieid, time, username } = comment;

  // Format the publish date
  const publishDate = time ? new Date(time.toMillis()).toLocaleString() : '';

  return (
    <div className="comment-card">
      <div className="comment-card-header">
        <span className="username">{username}</span>
        <span className="publish-date">posted on {publishDate}</span>
      </div>
      <div className="comment-card-content">{Comment}</div>
      <div className="comment-card-buttons">
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default CommentCard;
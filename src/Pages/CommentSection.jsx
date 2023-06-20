import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { db } from "../firebase.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import CommentCard from './CommentCard';

const API_IMG = "https://image.tmdb.org/t/p/w500/";

export const CommentSection = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const commentCollectionRef = collection(db, "Comments");
  const title = searchParams.get('title');
  const poster = searchParams.get('poster');
  const vote = searchParams.get('vote');
  const release = searchParams.get('release');
  const overview = searchParams.get('overview');
  const movieid = searchParams.get('id');
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');

  function saveTimestampToFirestore() {
    const timestampInMillis = Date.now();
    const timestamp = Timestamp.fromMillis(timestampInMillis);
    return timestamp;
  }

  const createComment = async () => {
    await addDoc(commentCollectionRef, {
      Comment: newComment,
      movieid: movieid,
      time: saveTimestampToFirestore(),
      username: "testing"
    });
 
    // Fetch the updated comment list from the database
    const q = query(collection(db, 'Comments'), where('movieid', '==', movieid));
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => doc.data());
    setCommentList(comments);
 
    // Clear the comment input
    setNewComment('');
  };
 

  const deleteComment = async (id) => {
    const commentDoc = doc(db, "Comments", id);
    await deleteDoc(commentDoc)
  }

  const updateComment = async (id, updatedComment) => {
    const commentDoc = doc(db, "Comments", id);
    await updateDoc(commentDoc, updatedComment)
  }

 
  useEffect(() => {
    const getCommentList = async () => {
      try {
        if (movieid) {
          const q = query(collection(db, 'Comments'), where('movieid', '==', movieid));
          const querySnapshot = await getDocs(q);
          const comments = querySnapshot.docs.map((doc) => doc.data());
          setCommentList(comments);
        }
      } catch (err) {
        console.error('Error retrieving comments:', err);
      }
    };
 
    getCommentList();
  }, [movieid]);

  // Calculate the number of filled stars based on the vote
  const filledStars = Math.round(vote / 2);

  // Create an array to store the star elements
  const starElements = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`star ${index < filledStars ? 'filled' : ''}`}
    />
  ));

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Add the new comment to the comments array
    const updatedComments = [...commentList, newComment];
    setCommentList(updatedComments);

    // Clear the comment input
    setNewComment('');
  };


  return (
    <div className="comment-section-container">
      <div className="image-container">
        <img src={API_IMG + poster} alt="Movie Poster" />
      </div>
      <h1>{title}</h1>
      <div className="details-container">
        <div className="rating-container">
          <span className="rating-label">IMDB Rating:</span>
          <div className="star-rating">{starElements}</div>
        </div>
        <div className="release-date-container">
          <span className="release-date-label">Release Date:&nbsp;</span>
          <span className="release-date">{release}</span>
        </div>
      </div>
      <h2 className="comment-title">Summary</h2>
      <p className="overview">{overview}</p>
      <h2 className="comment-title">Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your comment"
        />
        <button className="submit-button" onClick={createComment}>Submit</button>
      </form>
      <div className="comment-list">
        {commentList.map((comment, index) => (
          <CommentCard
          key={index}
          comment={comment}
          deleteComment={() => deleteComment(comment.id)}
          updateComment={(updatedComment) => updateComment(comment.id, updatedComment)}
        />
        ))}
      </div>
    </div>
  );
}
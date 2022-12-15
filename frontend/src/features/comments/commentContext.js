import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch comments for a post by postId
  const fetchComments = async (id) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get(`/api/comments/${id}`);
      setComments(result.data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  // Add a comment
  const addComment = async (postId, comment) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.post(`/api/comments/${postId}`, comment);
      setComments((prev) => [...prev, result.data]);
    } catch (error) {
      setIsError(true);
    }
  };

  //   Edit a comment
  const editComment = async (postId, commentId, comment) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.put(
        `/api/comments/${postId}/${commentId}`,
        comment
      );
      const updatedComments = comments.map((post) =>
        comment._id === commentId ? result : post
      );
      setComments(updatedComments);
    } catch (error) {
      setIsError(true);
    }
  };

  // Delete a comment
  const deleteComment = async (postId, commentId) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.delete(`/api/comments/${postId}/${commentId}`);
      const filteredComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(filteredComments);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        fetchComments,
        addComment,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;

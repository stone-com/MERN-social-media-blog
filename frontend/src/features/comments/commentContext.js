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

  return (
    <CommentContext.Provider
      value={{ comments, setComments, fetchComments, addComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;

import CommentForm from './CommentForm';
import Comment from './Comment';
import { useContext, useEffect } from 'react';
import CommentContext from '../features/comments/commentContext';

export const CommentDisplay = (id, ) => {
  const { comments, fetchComments } = useContext(CommentContext);
  useEffect(() => {
    fetchComments(id.id);
  }, []);

  // console.log(data);
  return (
    <section className='py-8 mt-1 bg-green-200 rounded-xl'>
      <div className=''>
        <CommentForm postId={id}  />
        {comments &&
          comments
            .map((comment, index) => <Comment key={index} comment={comment} />)
            .reverse()}
      </div>
    </section>
  );
};
export default CommentDisplay;

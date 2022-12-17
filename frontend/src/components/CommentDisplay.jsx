import CommentForm from './CommentForm';
import Comment from './Comment';
import { useContext, useEffect } from 'react';
import CommentContext from '../features/comments/commentContext';

export const CommentDisplay = (id) => {
  const { comments, fetchComments } = useContext(CommentContext);
  useEffect(() => {
    fetchComments(id.id);
  }, []);

  // console.log(data);
  return (
    <section className='py-8 mt-3 bg-green-400 rounded-xl lg:py-16'>
      <div className='max-w-4xl px-4 mx-auto'>
        <CommentForm postId={id} />
        {comments &&
          comments
            .map((comment, index) => <Comment key={index} comment={comment} />)
            .reverse()}
      </div>
    </section>
  );
};
export default CommentDisplay;

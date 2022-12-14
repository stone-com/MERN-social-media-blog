import CommentForm from './CommentForm';
import Comment from './Comment';
import { useGetComments } from '../hooks/useGetComments';

const CommentDisplay = (id) => {
  // Get all comments for the post with useGetComments custom hook.
  const { data, isLoading, isError } = useGetComments(id);
  console.log(data);
  return (
    <section className='py-8 bg-white dark:bg-gray-900 lg:py-16'>
      <div className='max-w-4xl px-4 mx-auto'>
        <CommentForm />
        {data && data.map((comment) => <Comment comment={comment} />)}
      </div>
    </section>
  );
};
export default CommentDisplay;

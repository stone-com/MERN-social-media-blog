import CommentForm from './CommentForm';
import Comment from './Comment';
const CommentDisplay = () => {
  return (
    <section className='py-8 bg-white dark:bg-gray-900 lg:py-16'>
      <div className='max-w-4xl px-4 mx-auto'>
        <CommentForm />
        <Comment />
      </div>
    </section>
  );
};
export default CommentDisplay;

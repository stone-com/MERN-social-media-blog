import { useGetUsers } from '../hooks/postHooks';

const Test = () => {
  const { users } = useGetUsers();
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <div key={user._id} className='text-3xl font-bold underline'>
          {user.name}
        </div>
      ))}
    </div>
  );
};
export default Test;

import { useState } from 'react';
const EditProfile = () => {
  const [formData, setFormData] = useState({
    birthday: '',
    city: '',
    state: '',
    gender: '',
    occupation: '',
    bio: '',
    profilePic: '',
  });

  const { birthday, city, state, gender, occupation, bio, profilePic } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // submit form data to backend or process form data
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='birthday'>Birthday:</label>
      <input type='date' name='birthday' value={birthday} onChange={onChange} />
      <br />
      <label htmlFor='city'>City:</label>
      <input type='text' name='city' value={city} onChange={onChange} />
      <br />
      <label htmlFor='state'>State:</label>
      <input type='text' name='state' value={state} onChange={onChange} />
      <br />
      <label htmlFor='gender'>Gender:</label>
      <input type='text' name='gender' value={gender} onChange={onChange} />
      <br />
      <label htmlFor='occupation'>Occupation:</label>
      <input
        type='text'
        name='occupation'
        value={occupation}
        onChange={onChange}
      />
      <br />
      <label htmlFor='bio'>Bio:</label>
      <textarea name='bio' value={bio} onChange={onChange} />
      <br />
      <label htmlFor='profilePic'>Profile Picture:</label>
      <input
        type='file'
        name='profilePic'
        accept='image/*'
        onChange={onChange}
      />
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
};
export default EditProfile;

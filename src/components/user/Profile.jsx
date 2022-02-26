import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import jwt from 'jwt-decode';

//// Context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// actions
import { getUser } from '../../reducer/galaxyFilmActions';

//// COmponents
import Card from '../Card';
import Spinner from '../Spinner';

function Profile() {
  const { user, loading, dispatch } = useGalaxyFilmContext();

  console.log('user co ko:', user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    avatar: '',
  });

  const { firstName, lastName, email, avatar, password, password2, gender } =
    formData;

  const [isUpdate, setIsUpdate] = useState(false);

  const token = localStorage.getItem('token');
  const userDecode = jwt(token);
  // console.log('userDecode: ', userDecode);
  const userFromToken = userDecode.user;
  // console.log('userFromToken: ', userFromToken);

  const params = useParams();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const getUserProfile = async () => {
      const userData = await getUser(userFromToken.id);
      dispatch({ type: 'GET_USER', payload: userData });
      // setFormData((prevState) => ({
      //   ...prevState,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   avatar: user.avatar,
      //   email: user.email,
      //   gender: user.gender,
      // }));
    };

    getUserProfile();
    dispatch({ type: 'OFF_LOADING' });
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div className='mainContainer'>
        <div className='container'>
          <div className='currentUser'>
            <p className='heading'>Your Current Account</p>
            <Card>
              <div className='userContent'>
                <div className='wrapAvatar'>
                  <div className='avatarUser'>
                    <img
                      className='avatarImg'
                      src={
                        user.avatar
                          ? user.avatar
                          : 'https://joeschmoe.io/api/v1/random'
                      }
                      alt='avatar'
                    />
                  </div>
                </div>
                <div className='userInfo'>
                  <p className='userCurTitle'>
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                </div>
              </div>
              <button
                className='btnEdit'
                onClick={setIsUpdate((prevState) => {
                  console.log(prevState);
                  return !prevState;
                })}
              >
                Edit
              </button>
            </Card>
          </div>

          <div className='registerWrap'>
            <section className='heading'>
              <p>Edit your account</p>
            </section>

            <section className='form'>
              <form onSubmit={onSubmit}>
                {/* firstName */}
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    name='firstName'
                    value={firstName}
                    // value={user.firstName}
                    onChange={onChange}
                    placeholder='Enter your first name'
                    required
                    disabled={!isUpdate}
                  />
                </div>

                {/* lastName */}
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    // value={user.lastName}
                    onChange={onChange}
                    placeholder='Enter your last name'
                    required
                    disabled={!isUpdate}
                  />
                </div>

                {/* avatar */}
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='avatar'
                    name='avatar'
                    value={avatar}
                    onChange={onChange}
                    placeholder='Enter your new avatar url'
                    required
                    disabled={!isUpdate}
                  />
                </div>

                {/* gender */}
                <div className='form-group'>
                  <select
                    name='gender'
                    id='gender'
                    value={gender}
                    // value={user.gender}
                    onChange={onChange}
                    // onChange={(e) => setGender(e.target.value)}
                    disabled={!isUpdate}
                  >
                    <option value='' disabled={!isUpdate}>
                      Choose your gender
                    </option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='others'>Others</option>
                  </select>
                </div>

                {/* email */}
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    // value={user.email}
                    onChange={onChange}
                    placeholder='Enter your email'
                    required
                    disabled={!isUpdate}
                  />
                </div>

                {/* password */}
                {/* <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    placeholder='Enter your password'
                    required
                  />
                </div> */}

                {/* password2 */}
                {/* <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    placeholder='Confirm your password'
                    required
                  />
                </div> */}

                <div className='form-group'>
                  <button
                    className={`btn btn-block ${
                      !isUpdate ? 'btn-disable' : null
                    }`}
                    disabled={!isUpdate}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
      {/* current User */}
    </>
  );
}

export default Profile;

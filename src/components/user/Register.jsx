import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

//// context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// actions
import { register, getUsers } from '../../reducer/galaxyFilmActions';

// cpns
import Spinner from '../Spinner';

function Register() {
  const { users, loading, dispatch } = useGalaxyFilmContext();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    gender: '',
  });
  // const [gender, setGender] = useState('');

  const { firstName, lastName, email, password, password2, gender } = formData;

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const fetchUsers = async () => {
      const users = await getUsers();
      dispatch({ type: 'GET_USERS', payload: users });
    };

    fetchUsers();
    dispatch({ type: 'OFF_LOADING' });
    console.log('day la: users fetched', users);
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      password2 === '' ||
      gender === ''
    ) {
      toast.error('Please enter data in all fields');
      return;
    } else if (password !== password2) {
      toast.error('Password do not match');
      return;
    } else {
      const userData = {
        firstName,
        lastName,
        gender,
        email,
        password,
      };

      dispatch({ type: 'SET_LOADING' });
      const resultRegister = await register(userData);
      // dispatch({ type: 'REGISTER_USER', payload: resultRegister });
      dispatch({ type: 'OFF_LOADING' });
      console.log('hehe: ', resultRegister);
      if (resultRegister.isSuccess) {
        toast.success(resultRegister.message);
        setTimeout(() => {
          // window.location = '/login';
          history.push('/login');
        }, 2000);
      } else {
        toast.error(resultRegister.message);
        return;
      }
    }

    // console.log(formData);
  };

  // if (loading) return <Spinner />;

  return (
    <div className='registerWrap'>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
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
              onChange={onChange}
              placeholder='Enter your first name'
              required
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
              onChange={onChange}
              placeholder='Enter your last name'
              required
            />
          </div>

          {/* gender */}
          <div className='form-group'>
            <select
              name='gender'
              id='gender'
              value={gender}
              onChange={onChange}

              // onChange={(e) => setGender(e.target.value)}
            >
              <option value=''>Choose your gender</option>
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
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>

          {/* password */}
          <div className='form-group'>
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
          </div>

          {/* password2 */}
          <div className='form-group'>
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
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;

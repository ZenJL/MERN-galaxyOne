import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

//// context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// actions
import { login, getUsers } from '../../reducer/galaxyFilmActions';

function Login() {
  const { users, user, loading, dispatch } = useGalaxyFilmContext();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const history = useHistory();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      toast.error('Email and password could not be empty');
      return;
    } else {
      const loginData = {
        email,
        password,
      };

      try {
        dispatch({ type: 'SET_LOADING' });
        const resultLogin = await login(loginData);
        dispatch({ type: 'OFF_LOADING' });
        console.log('result login: ', resultLogin);
        localStorage.setItem('token', resultLogin.token);
        toast.success(resultLogin.msg);
        setTimeout(() => {
          history.push('/');
        }, 2000);
      } catch (error) {
        console.log('login err: ', error);
        toast.error('something went wrong ...');
      }
    }
  };

  return (
    <>
      <div className='mainContainer'>
        <div className='container'>
          <section className='heading'>
            <h2>
              <FaSignInAlt />
              Login
            </h2>
            <p>Please log in to explore more!</p>
          </section>

          <section className='form'>
            <form onSubmit={onSubmit}>
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

              <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;

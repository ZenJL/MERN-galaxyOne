import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Image } from 'antd';

//// context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// actions
import { getUsers } from '../../reducer/galaxyFilmActions';

//// COmponents
import Spinner from '../Spinner';
import Card from '../Card';
import UserItem from './UserItem';

function UserList() {
  const { users, loading, dispatch } = useGalaxyFilmContext();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const runGetUsers = async () => {
      const users = await getUsers();
      dispatch({ type: 'GET_USERS', payload: users });
    };

    runGetUsers();
    dispatch({ type: 'OFF_LOADING' });
    // console.log('users dung ko: ', users);
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <div className='mainContainer'>
        <div className='container'>
          <Link to='/' className='btn btn-back wrapBtnBack'>
            To Home
          </Link>

          <p className='heading'>Our Community</p>
          <div className='userList'>
            {users.map((user) => (
              <UserItem key={user._id} user={user}></UserItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;

import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

//// Components
import LogoApp from './LogoApp';

function AppHeader() {
  return (
    <div className='container'>
      <div className='flexHeader'>
        <LogoApp />

        <Menu
          mode='horizontal'
          defaultSelectedKeys={['home']}
          className='topMenu'
        >
          <div className='filmMenu'>
            <Link to={'/api/films'}>
              <Menu.Item key='home'>Home</Menu.Item>
            </Link>
            <Link to='/api/films/create-film'>
              <Menu.Item key='addFilm'>Add New Film</Menu.Item>
            </Link>
          </div>

          <div className='userMenu'>
            <Link to='/api/users/login'>
              <Menu.Item key='login'>Login</Menu.Item>
            </Link>
            <Link to='/api/users/register'>
              <Menu.Item key='register'>Register</Menu.Item>
            </Link>
            <Link to='/api/users'>
              <Menu.Item key='users'>Members List</Menu.Item>
            </Link>
            <Link to='/api/users/'>
              <Menu.Item key='profile' style={{ paddingRight: 0 }}>
                User Profile
              </Menu.Item>
            </Link>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;

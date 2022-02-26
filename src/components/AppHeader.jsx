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
            <Link to={'/'}>
              <Menu.Item key='home'>Home</Menu.Item>
            </Link>
            <Link to='/films'>
              <Menu.Item key='film'>Add New Film</Menu.Item>
            </Link>
          </div>
          <div className='userMenu'>
            <Link to='/login'>
              <Menu.Item key='register'>Login</Menu.Item>
            </Link>
            <Link to='/register'>
              <Menu.Item key='register'>Register</Menu.Item>
            </Link>
            <Link to='/users'>
              <Menu.Item key='users'>Members List</Menu.Item>
            </Link>
            <Link to='/users/:id'>
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

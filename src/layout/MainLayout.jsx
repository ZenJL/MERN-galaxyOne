import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// import jwt from 'jwt-decode';

import AppHeader from '../components/AppHeader';

import { Space, Card } from 'antd';
import { Layout } from 'antd';

//// Components
import Dashboard from '../components/Dashboard';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import NotFoundPage from '../components/NotFoundPage';
import UserList from '../components/user/UserList';
import Profile from '../components/user/Profile';
import CreateFilm from '../components/film/CreateFilm';

const { Header, Content, Footer } = Layout;

function MainLayout({ children }) {
  // const token = localStorage.getItem('token');
  // const userDecode = jwt(token);
  // const userIdFromToken = userDecode.user.id;

  return (
    <>
      <Layout className='layout' style={{ minHeight: '100vh', width: '100%' }}>
        <Space
          direction='vertical'
          size='medium'
          style={{
            minHeight: '100vh',
          }}
        >
          <Header style={{ width: '100%' }}>
            <AppHeader />
          </Header>

          {/* ant-layout-content */}
          <Content>
            <div className='site-layout-content'>
              <Switch>
                <Route exact path='/'>
                  <Dashboard />
                </Route>
                <Route exact path='/films' component={CreateFilm} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/users' component={UserList} />
                <Route exact path='/users/:id' component={Profile} />
                {/* <Route exact path='/*' component={NotFoundPage} /> */}
              </Switch>
            </div>
          </Content>

          <Footer
            style={{
              textAlign: 'center',
              width: '100%',
              // position: 'fixed',
              // bottom: 0,
              // left: 0,
              // right: 0,
            }}
          >
            Powered By Ant Design
          </Footer>
        </Space>
      </Layout>
    </>
  );
}

export default MainLayout;

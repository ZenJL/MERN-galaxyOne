import { Route, Switch } from 'react-router-dom';

import AppHeader from '../components/AppHeader';

import { Space, Layout } from 'antd';

//// Components
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFoundPage from 'pages/NotFound';
import UserList from 'pages/UserList';
import Profile from 'pages/Profile';
import CreateFilm from 'pages/CreateFilm';
import { useEffect } from 'react';
import { useGalaxyFilmContext } from 'context/galaxyFilmContext';

const { Header, Content, Footer } = Layout;

function MainLayout({ children }) {
  const { authorizeUser } = useGalaxyFilmContext();

  const token = localStorage.getItem('token');

  useEffect(() => {
    authorizeUser(token);
  }, []);
  //// add loading
  return (
    <>
      <Layout className='layout' style={{ minHeight: '100vh', width: '100%' }}>
        {/* <Space
          direction='vertical'
          size='medium'
          style={{
            minHeight: '100vh',
          }}
        > */}
        <Header style={{ width: '100%' }}>
          <AppHeader />
        </Header>

        {/* ant-layout-content */}
        <Content>
          <div className='site-layout-content'>
            <Switch>
              <Route exact path='/api/films'>
                <Dashboard />
              </Route>
              <Route
                exact
                path='/api/films/create-film'
                component={CreateFilm}
              />
              <Route exact path='/api/users/login' component={Login} />
              <Route exact path='/api/users/register' component={Register} />
              <Route exact path='/api/users' component={UserList} />
              <Route exact path='api/users/' component={Profile} />
              <Route exact path='/*' component={NotFoundPage} />
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
        {/* </Space> */}
      </Layout>
    </>
  );
}

export default MainLayout;

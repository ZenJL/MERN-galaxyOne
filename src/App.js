import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//// Context provider
import { GalaxyFilmProvider } from './context/galaxyFilmContext';

//// Components
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <GalaxyFilmProvider>
      <Router>
        <div className='App'>
          <MainLayout />
        </div>
      </Router>
      <ToastContainer />
    </GalaxyFilmProvider>
  );
}

export default App;

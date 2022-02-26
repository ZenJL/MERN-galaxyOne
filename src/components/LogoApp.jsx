import { Link } from 'react-router-dom';

function LogoApp() {
  return (
    <>
      <Link to='/' className='logo'>
        <h1>Galaxy One</h1>
      </Link>
    </>
  );
}

export default LogoApp;

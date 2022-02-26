import { Link } from 'react-router-dom';

function LogoApp({ text = 'Galaxy One'}) {
  return (
    <>
      <Link to='/' className='logo'>
        <h1>{text}</h1>
      </Link>
    </>
  );
}

export default LogoApp;

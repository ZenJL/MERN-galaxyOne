import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='hero'>
      <div className='heroContent'>
        <div className='displayHeroContent'>
          <h1 className='heroContentHeading'>Oops!</h1>
          <p className='heroContentDesc'>404 - Page Not Found</p>
          <Link to='/' className='btn'>
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

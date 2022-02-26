import { Link } from 'react-router-dom';

//// COmponents
import Card from '../Card';
import FilmDetails from './FilmDetails';

function FilmItem({ film }) {
  const {
    titleEn,
    titleVi,
    type,
    country,
    releaseDate,
    producer,
    director,
    poster,
    banner,
    description,
    createdDate,
    actor,
  } = film;
  return (
    <>
      <div className='filmItem'>
        <Card>
          <Link to={`film/${film._id}`}>
            <img className='filmBanner' src={banner} alt='banner' />
          </Link>
          <div className='cardContent'>
            <h4 className='bannerTitleEn'>{titleEn}</h4>
            <p className='bannerTitleVi'>{titleVi}</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default FilmItem;

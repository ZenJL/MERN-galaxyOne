import { useEffect } from 'react';

//// Context
import { useGalaxyFilmContext } from '../context/galaxyFilmContext';

//// COmponents
import Slider from './Slider';
import SearchFilmForm from './film/SearchFilmForm';
import FilmList from './film/FilmList';
import Spinner from './Spinner';

//// actions
import { getFilms } from '../reducer/galaxyFilmActions';

function Dashboard() {
  const { films, loading, dispatch } = useGalaxyFilmContext();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });

    const fetchFilms = async () => {
      const films = await getFilms();
      dispatch({ type: 'GET_FILMS', payload: films });
    };

    fetchFilms();

    dispatch({ type: 'OFF_LOADING' });
  }, [dispatch]);

  // if (loading) return <Spinner />;

  return (
    <>
      <Slider films={films} />
      <div className='mainContainer'>
        <div className='container'>
          <SearchFilmForm films={films} />
          <FilmList films={films} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

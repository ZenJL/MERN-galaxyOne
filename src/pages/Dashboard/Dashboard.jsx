import { useEffect, useRef } from 'react';

//// COmponents
import Slider from 'components/Slider';
import SearchFilmForm from '../../components/film/SearchFilmForm';
import FilmList from '../../components/film/FilmList';
import Spinner from '../../components/Spinner';
import InfiniteSpinner from 'components/InfiniteSpinner';

// Context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// actions
// import { getFilms } from '../../reducer/galaxyFilmActions';

function Dashboard() {
  const { page, films, loading, dispatch } = useGalaxyFilmContext();

  const spinnerRef = useRef();

  /// infinite scroll
  const handleLoadMore = (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) return;

    // set loadmore
    dispatch({
      type: 'SET_PAGE',
      payload: page + 1,
    });
    // setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (!spinnerRef.current) return;

    let observerRefValue = null;

    let options = {
      root: null,
      rootMargin: '100px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleLoadMore, options);
    observer.observe(spinnerRef.current);
    observerRefValue = spinnerRef.current;

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <>
      <Slider films={films} />
      <div className='mainContainer'>
        <div className='container'>
          <SearchFilmForm />
          <FilmList />

          {!loading && <InfiniteSpinner />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

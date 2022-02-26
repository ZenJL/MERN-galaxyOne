import { useState } from 'react';

//// Context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// Components
import Card from '../Card';
import FilmItem from './FilmItem';

function FilmList({ films }) {
  const [nowShowing, setNowShowing] = useState(true);

  // const { films } = useGalaxyFilmContext();

  return (
    <>
      <div className='filmListHeading'>
        <div className='groupFilmHeading'>
          <button
            className={`btn btnFilmList ${nowShowing && 'active'}`}
            onClick={() => setNowShowing(true)}
            disabled={nowShowing ? true : false}
          >
            NOW SHOWING
          </button>
          <button
            className={`btn btnFilmList ${!nowShowing && 'active'}`}
            onClick={() => setNowShowing(false)}
            disabled={nowShowing ? false : true}
          >
            INCOMING NEXT
          </button>
          <div
            className={nowShowing ? 'horizonLineShowing' : 'horizonLine2'}
          ></div>
        </div>
      </div>
      <div className='filmList'>
        {films.map((film) => (
          <FilmItem key={film._id} film={film} />
        ))}
      </div>
    </>
  );
}

export default FilmList;

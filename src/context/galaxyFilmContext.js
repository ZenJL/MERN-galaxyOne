import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';

//// reducer
import galaxyFilmReducer from '../reducer/galaxyFilmReducer';

const GalaxyFilmContext = createContext();

//// .env
const EXPRESS_API = process.env.REACT_APP_EXPRESS_API_URL;

const GalaxyFilmProvider = ({ children }) => {
  const initialState = {
    filmsDefault: [],
    users: [],
    user: {},
    films: [],
    film: {},
    loading: true,
  };

  // use reducer
  const [state, dispatch] = useReducer(galaxyFilmReducer, initialState);

  //// specific for set loading
  // const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GalaxyFilmContext.Provider
      value={{
        // users: state.users,
        // user: state.user,
        // films: state.films,
        // filmsDefault: state.filmsDefault,
        // film: state.film,
        // loading: state.loading,
        ...state,
        dispatch,
      }}
    >
      {children}
    </GalaxyFilmContext.Provider>
  );
};

const useGalaxyFilmContext = () => useContext(GalaxyFilmContext);

export { GalaxyFilmProvider, useGalaxyFilmContext };

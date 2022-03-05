import axios from 'axios';
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
//// https://zenl-auth-express-api.herokuapp.com/api

const GalaxyFilmProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    filteredFilms: [],
    filmsDefault: [],
    users: [],
    user: {},
    films: [],
    film: {},
    loading: false,
    totalCount: 7,
    page: 1,
    limit: 9,
  };

  let token;

  //// use reducer
  const [state, dispatch] = useReducer(galaxyFilmReducer, initialState);

  const fetchFilms = async (_page) => {
    dispatch({ type: 'SET_LOADING' });
    if (state.films.length === state.totalCount) {
      dispatch({ type: 'OFF_LOADING' });
      return;
    }

    const res = await axios.get(`${EXPRESS_API}/films?page=${_page}&limit=9`);
    console.log(res.data);
    dispatch({ type: 'SET_TOTALCOUNT', payload: res.data.total });
    console.log(res.data.data);

    const fetchFilmsData = await res.data.data;

    dispatch({ type: 'GET_FILMS', payload: fetchFilmsData });
  };

  const fetchUsers = async (_page) => {
    dispatch({ type: 'SET_LOADING' });

    const res = await axios.get(`${EXPRESS_API}/users`);
    // console.log(res.data);
    // dispatch({ type: 'SET_TOTALCOUNT', payload: res.data.total });
    console.log(res.data.data);

    const fetchUsersData = await res.data.data;

    dispatch({ type: 'GET_USERS', payload: fetchUsersData });
  };

  const authorizeUser = async (token) => {
    dispatch({ type: 'SET_LOADING' });

    token = localStorage.getItem('token');

    const res = await axios.get(`${EXPRESS_API}/auth`, {
      header: {
        'x-auth-token': token,
      },
    });
    console.log('authen user: ', res.data);

    console.log(res.data.data);

    // const authorizeUsersData = await res.data.data;

    // dispatch({ type: 'GET_USERS', payload: authorizeUsersData });
  };

  useEffect(() => {
    fetchFilms(state.page, state.limit);
    fetchUsers();
    // dispatch({ type: 'OFF_LOADING' });
  }, [state.page, state.limit]);

  // create debounce for search field
  const useDebounce = (text, delay = 700) => {
    const [debounced, setDebounced] = useState(text);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounced(text);
      }, delay);

      // clean effect
      return () => {
        clearTimeout(handler);
      };
    }, [text, delay]);

    return debounced;
  };

  return (
    <GalaxyFilmContext.Provider
      value={{
        users: state.users,
        // user: state.user,
        films: state.films,
        filmsDefault: state.filmsDefault,
        filteredFilms: state.filteredFilms,
        film: state.film,
        loading: state.loading,
        // ...state,
        // login,
        dispatch,
        // fetchFilms,
        useDebounce,
        authorizeUser,
      }}
    >
      {children}
    </GalaxyFilmContext.Provider>
  );
};

const useGalaxyFilmContext = () => useContext(GalaxyFilmContext);

export { GalaxyFilmProvider, useGalaxyFilmContext };

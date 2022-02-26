const galaxyFilmReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'GET_FILMS':
      return {
        ...state,
        films: action.payload,
        loading: false,
      };
    case 'GET_FILM':
      return {
        ...state,
        film: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'OFF_LOADING':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default galaxyFilmReducer;

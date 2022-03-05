import axios from 'axios';

//// .env
const EXPRESS_API = process.env.REACT_APP_EXPRESS_API_URL;

//// register user
export const register = async (userData) => {
  const res = await axios.post(`${EXPRESS_API}/users/register`, userData);

  // console.log('register: ', res.data);
  return res.data;
};

//// register user
export const login = async (userData) => {
  const res = await axios.post(`${EXPRESS_API}/users/login`, userData);

  console.log('login: ', res.data);
  return res.data;
};

//// display in member
//// get all users
export const getUsers = async () => {
  const res = await axios.get(`${EXPRESS_API}/users`);
  console.log(res.data.data);

  return res.data.data;
};

//// get single user
export const getUser = async (userId) => {
  const res = await axios.get(`${EXPRESS_API}/users/${userId}`);
  console.log(res.data.data);
  if (res.status === 404) {
    window.location = '/notfound';
  } else {
    return res.data.data;
  }
};

//// update user
export const updateUser = async (userId, token, updateData) => {
  const res = await axios.put(`${EXPRESS_API}/users/${userId}`, updateData, {
    headers: {
      'x-auth-token': token,
    },
  });
  console.log(res.data);
  return res.data;
};

//// delete user
export const deleteUser = async (userId, token) => {
  const res = await axios.delete(`${EXPRESS_API}/users/${userId}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  console.log(res);
  return res;
};

export const getFilms = async () => {
  const res = await axios.get(`${EXPRESS_API}/films`);
  // console.log(res.data.data);
  // setUsers(res.data.data);
  // setLoading(false);
  return res.data.data;
};

//// get single film
export const getFilm = async (filmId) => {
  const res = await axios.get(`${EXPRESS_API}/films/${filmId}`);
  console.log(res.data.data);

  return res.data.data;
};

//// create film
export const createFilm = async (filmData, token) => {
  const res = await axios.post(`${EXPRESS_API}/films`, filmData, {
    headers: {
      'x-auth-token': token,
    },
  });

  // console.log('createFilm: ', res.data);
  return res.data;
};

import axios from 'axios';

export const axiosUserBooks = axios.create({
  baseURL:
    'https://bestreads-5b430-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const axiosSignup = axios.create({
  baseURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEINgm_j68xaj2FBkXcnkFvhoTgALyXBc',
});

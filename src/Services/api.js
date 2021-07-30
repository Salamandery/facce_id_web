import Axios from 'axios';

const api = Axios.create({
  //baseURL: 'https://projetoleito.herokuapp.com/',
  //baseURL: 'http://localhost:3333',
  baseURL: 'http://localhost:5555',
});
export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3389',
});

export default api;

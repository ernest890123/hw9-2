import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : "http://localhost:4000/";
console.log(API_ROOT)
const api = axios.create({ baseURL: API_ROOT })
export default api;
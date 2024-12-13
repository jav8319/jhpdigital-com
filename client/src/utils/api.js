import axios from 'axios';
import urls from "../urls.json" // Import dotenv correctly

let envlocal
let baseURL

if (urls.enviroment=== 'production') {
  baseURL = urls.BASE_URL_Pro;
  envlocal = false
} else if (urls.enviroment === 'development') {
  baseURL = urls.BASE_URL_Dev;
  envlocal = true
} else if (urls.enviroment=== 'test') {
  baseURL = urls.BASE_URL_Test;
  envlocal = true
} 
export const Alldata = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true
});
export const Api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true
});
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const myEnv = envlocal








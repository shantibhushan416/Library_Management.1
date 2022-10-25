import axios from "axios";
import { getLocalStorageData } from "../../utils/utility";

const api = axios.create({
  baseURL: "https://librarybackendapp.herokuapp.com",
});

api.interceptors.request.use(
  (config) => {
    // console.log("config", getLocalStorageData());
    config.headers.Authorization = getLocalStorageData()?.token;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://librarybackendapp.herokuapp.com",
});

api.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
// import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + process.env.REACT_APP_TOKEN,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    // console.log("Starting Request", request);
    return request;
  },
  function (error) {
    // console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    // let errorMsg = error.error || error.errors.message || "";
    // toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default api;

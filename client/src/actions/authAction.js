import axios from "axios";
import { GET_ERRORS, SET_USER_TOKEN, CLEAR_CURRENT_PROFILE } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const register = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const login = userData => dispatch => {
  console.log("login action");
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save To LocalStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set TOken TO Auth Header
      setAuthToken(token);

      //Decode TOken
      const decode = jwt_decode(token);

      dispatch(setCurrentUser(decode));
    })
    .catch(
      err => console.log({ err })
      /*  dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }) */
    );
};

export const setCurrentUser = decode => {
  return {
    type: SET_USER_TOKEN,
    payload: decode
  };
};

export const logout = () => dispatch => {
  //Remove token
  localStorage.removeItem("jwtToken");
  //Remove auth user header
  setAuthToken(false);
  //set user to empty object
  dispatch(setCurrentUser({}));
};

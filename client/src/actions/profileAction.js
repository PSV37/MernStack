import axios from "axios";
import { SET_USER_TOKEN } from "./types";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear Current User
export const clearProfileLoading = decode => {
  return {
    type: CLEAR_CURRENT_PROFILE,
    payload: decode
  };
};

//Create Profile
export const createProfile = (profile, history) => dispatch => {
  axios
    .post("api/profile/create", profile)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Current User Profile
export const deleteCurrentUserAccount = () => dispatch => {
  if (window.confirm("Are you sure")) {
    axios.delete("/api/profile").then(res =>
      dispatch({
        type: SET_USER_TOKEN,
        payload: {}
      })
    );
  }
};

//Edit CUrrent User Profile
export const editProfile = () => {};

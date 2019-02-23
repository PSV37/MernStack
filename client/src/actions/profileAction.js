import axios from "axios";
import { SET_USER_TOKEN, GET_PROFILES } from "./types";

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

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/handle/" + handle)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
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

//Add Experience Details
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Education Details
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("api/profile/education", eduData)
    .then(res => history.push("dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Education By Id
export const deleteEducation = (eduId, history) => dispatch => {
  axios
    .delete("api/profile/education/" + eduId)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experince By Id
export const deleteExperience = (eduId, history) => dispatch => {
  axios
    .delete("api/profile/experience/" + eduId)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//Get ALl Profiles Details
export const getAllProfiles = () => dispatch => {
  axios
    .get("api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//Edit CUrrent User Profile
export const editProfile = () => {};

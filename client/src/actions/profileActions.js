import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE, GET_ERRORS } from "./types";

// add education to user's profile

export const addEducation = (userData, history) => dispatch => {
  axios
    .post("/api/profile/education", userData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// remove user's experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`api/profile/experience/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// add experience to user's profile
export const addExperience = (userData, history) => dispatch => {
  axios
    .post("/api/profile/experience", userData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register user's profile
export const createProfile = (userData, history) => dispatch => {
  axios
    .post("/api/profile", userData)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .then(history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get current profile
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

// profile is loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

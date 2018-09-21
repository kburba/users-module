import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE, GET_ERRORS } from "./types";

// Register user's profile
export const registerProfile = (userData, history) => dispatch => {
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

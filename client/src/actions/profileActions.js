import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE } from "./types";

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

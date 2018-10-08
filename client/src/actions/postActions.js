import {
  POST_LOADING,
  GET_POSTS,
  GET_ERRORS,
  ADD_POST,
  DELETE_POST,
  LIKE_POST
} from "./types";
import axios from "axios";

export const likePost = postData => dispatch => {
  axios
    .post(`api/posts/like/${postData.post_id}`)
    .then(res => dispatch({ type: LIKE_POST, payload: postData }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deletePost = post_id => dispatch => {
  axios
    .delete(`api/posts/${post_id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: post_id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
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

export const setPostsLoading = () => {
  return {
    type: POST_LOADING
  };
};

import {
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => {
          return post._id !== action.payload;
        })
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
